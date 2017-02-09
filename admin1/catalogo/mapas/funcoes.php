<?php
namespace admin\catalogo\mapas;
function listar($dbh, $id_mapa = ""){
	global $esquemaadmin;
	if($id_mapa != ""){
		$dados = pegaDados ( "SELECT id_mapa, publicado_mapa, ordem_mapa, perfil_mapa, ligados_mapa, temas_mapa, desc_mapa, ext_mapa, imagem_mapa, linkdireto_mapa, nome_mapa, outros_mapa, 'nao' as contemmapfile from " . $esquemaadmin . "i3geoadmin_mapas where id_mapa = $id_mapa AND mapfile = '' or mapfile is null ", $dbh, false );
		if(count($dados) == 0){
			$dados = pegaDados ( "SELECT id_mapa, publicado_mapa, ordem_mapa, perfil_mapa, ligados_mapa, temas_mapa, desc_mapa, ext_mapa, imagem_mapa, linkdireto_mapa, nome_mapa, outros_mapa, 'sim' as contemmapfile from " . $esquemaadmin . "i3geoadmin_mapas where id_mapa = $id_mapa AND mapfile != '' and mapfile is not null ", $dbh, false );
		}
		$dados = $dados[0];
	} else {
		$dados = pegaDados ( "SELECT id_mapa, nome_mapa from " . $esquemaadmin . "i3geoadmin_mapas order by ordem_mapa, lower(nome_mapa)", $dbh, false );
	}
	if ($dados === false) {
		return false;
	} else {
		return $dados;
	}
}
function adicionar($publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, $dbhw) {
	global $esquemaadmin;
	try {
		$dataCol = array (
				"publicado_mapa" => '',
				"ordem_mapa" => 0,
				"perfil_mapa" => '',
				"desc_mapa" => '',
				"ext_mapa" => '',
				"imagem_mapa" => '',
				"linkdireto_mapa" => '',
				"outros_mapa" => '',
				"temas_mapa" => '',
				"ligados_mapa" => '',
				"nome_mapa" => '',
				"mapfile" => ''
		);
		$id_mapa = i3GeoAdminInsertUnico ( $dbhw, "i3geoadmin_mapas", $dataCol, "nome_mapa", "id_mapa" );
		$retorna = \admin\catalogo\mapas\alterar ( $id_mapa, $publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, '', $dbhw );
		return $retorna;
	} catch ( PDOException $e ) {
		return false;
	}
}
// $papeis deve ser um array
function alterar($id_mapa, $publicado_mapa, $ordem_mapa, $perfil_mapa, $ligados_mapa, $temas_mapa, $desc_mapa, $ext_mapa, $imagem_mapa, $linkdireto_mapa, $nome_mapa, $outros_mapa, $mapfile, $dbhw) {
	global $convUTF, $esquemaadmin;
	if ($convUTF != true) {
		$nome_mapa = utf8_decode ( $nome_mapa );
		$desc_mapa = utf8_decode ( $desc_mapa );
		$perfil_menu = utf8_decode ( $perfil_mapa );
	}
	$perfil_mapa = str_replace ( ",", " ", trim ( $perfil_mapa ) );
	// verifica a consistencia da lista de perfis
	$perfis = pegaDados ( "SELECT perfil from " . $esquemaadmin . "i3geoadmin_perfis order by perfil", $dbw, false );
	$p = array ();
	foreach ( $perfis as $perfil ) {
		$p [] = $perfil ["perfil"];
	}
	$perfil_mapa = implode ( " ", array_intersect ( explode ( " ", $perfil_mapa ), $p ) );

	$dataCol = array (
			"publicado_mapa" => $publicado_mapa,
			"ordem_mapa" => $ordem_mapa,
			"desc_mapa" => $desc_mapa,
			"ext_mapa" => $ext_mapa,
			"imagem_mapa" => $imagem_mapa,
			"outros_mapa" => $outros_mapa,
			"nome_mapa" => $nome_mapa,
			"linkdireto_mapa" => $linkdireto_mapa,
			"temas_mapa" => $temas_mapa,
			"ligados_mapa" => $ligados_mapa,
			"perfil_mapa" => $perfil_mapa
	);
	$resultado = i3GeoAdminUpdate ( $dbhw, "i3geoadmin_mapas", $dataCol, "WHERE id_mapa = $id_mapa" );
	if ($resultado === false) {
		return false;
	}
	return $id_mapa;
}
function excluir($id_mapa, $dbhw) {
	global $esquemaadmin;
	$resultado = i3GeoAdminExclui ( $esquemaadmin . "i3geoadmin_mapas", "id_mapa", $id_mapa, $dbhw, false );
	if ($resultado === false) {
		return false;
	}
	return $resultado;
}
?>