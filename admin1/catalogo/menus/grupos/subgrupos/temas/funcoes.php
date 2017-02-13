<?php
namespace admin\catalogo\menus\grupos\subgrupos\temas;
function todosTemas($dbh){
	global $esquemaadmin;
	$dados = pegaDados("select id_tema,desc_tema,nome_tema,codigo_tema  from ".$esquemaadmin."i3geoadmin_temas order by lower(nome_tema) ", $dbh, false);
	if ($dados === false) {
		return false;
	} else {
		return $dados;
	}
}
function listar($dbh, $id_n2 = "", $id_n3 = ""){
	global $esquemaadmin;
	if($id_n3 != ""){
		$dados = pegaDados("SELECT * from ".$esquemaadmin."i3geoadmin_n3 LEFT JOIN ".$esquemaadmin."i3geoadmin_temas ON i3geoadmin_n3.id_tema = i3geoadmin_temas.id_tema where id_n3 = '$id_n3'", $dbh, false);
		$dados = $dados[0];
	} else {
		$dados = pegaDados("SELECT i3geoadmin_n3.id_n3,i3geoadmin_temas.nome_tema from ".$esquemaadmin."i3geoadmin_n3 LEFT JOIN ".$esquemaadmin."i3geoadmin_temas ON i3geoadmin_n3.id_tema = i3geoadmin_temas.id_tema where id_n2 = '$id_n2' ORDER BY ordem", $dbh, false);
	}
	if ($dados === false) {
		return false;
	} else {
		return $dados;
	}
}
function adicionar( $id_tema, $id_n2, $publicado, $n3_perfil, $ordem, $dbhw) {
	global $esquemaadmin;
	try {
		$dataCol = array(
				"id_n2" => $id_n2,
				"publicado" => 'NAO',
				"ordem" => 0,
				"n3_perfil" => ''
		);
		$id_n3 = i3GeoAdminInsertUnico($dbhw,"i3geoadmin_n3",$dataCol,"n3_perfil","id_n3");
		$retorna = \admin\catalogo\menus\grupos\subgrupos\temas\alterar ( $id_n3, $id_tema, $id_n2, $publicado, $n3_perfil, $ordem, $dbhw );
		return $retorna;
	} catch ( PDOException $e ) {
		return false;
	}
}
// $papeis deve ser um array
function alterar($id_n3, $id_tema, $id_n2, $publicado, $n3_perfil, $ordem, $dbhw) {
	global $esquemaadmin;
	$dataCol = array(
			"publicado" => $publicado,
			"id_tema" => $id_tema,
			"ordem" => $ordem,
			"n3_perfil" => $n3_perfil
	);
	$resultado = i3GeoAdminUpdate($dbhw,"i3geoadmin_n3",$dataCol,"WHERE id_n3 = $id_n3");
	if ($resultado === false) {
		return false;
	}
	return $id_n3;
}
function excluir($id_n3, $dbhw) {
	global $esquemaadmin;
	$resultado = i3GeoAdminExclui ( $esquemaadmin . "i3geoadmin_n3", "id_n3", $id_n3, $dbhw, false );
	if ($resultado === false) {
		return false;
	}
	return $resultado;
}
function ordenar($id_n2, $ordem, $dbhw){
	global $esquemaadmin;
	//verifica se existe a mesma quantidade de registros no banco e na lista de ids
	$dados = pegaDados ( "SELECT ordem from ".$esquemaadmin."i3geoadmin_n3 WHERE id_n2 = $id_n2", $dbhw, false );
	if(count($dados) != count($ordem)){
		header ( "HTTP/1.1 500 erro numero de registros nao batem" );
		exit ();
	}
	//verifica se os ids existem no mesmo nivel
	$dados = pegaDados ( "SELECT ordem from ".$esquemaadmin."i3geoadmin_n3 WHERE id_n2 = $id_n2 AND id_n3 IN (" . implode(",",$ordem). ")", $dbhw, false );
	if(count($dados) != count($ordem)){
		header ( "HTTP/1.1 500 erro ids nao batem" );
		exit ();
	}
	$resultado = i3GeoAdminOrdena($dbhw,$ordem,"i3geoadmin_n3","id_n3");
	return $resultado;
}
?>