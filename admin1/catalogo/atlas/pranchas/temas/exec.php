<?php
/*
 * Licenca:
 *
 * GPL2
 *
 * i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet
 *
 * Direitos Autorais Reservados (c) 2006 Edmar Moretti
 * Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com
 *
 * Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
 * e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
 * GNU conforme publicada pela Free Software Foundation;
 *
 * Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
 * por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
 * de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
 * Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
 * Voc&ecirc; deve ter recebido uma copia da Licen&ccedil;a P&uacute;blica Geral do
 * GNU junto com este programa; se n&atilde;o, escreva para a
 * Free Software Foundation, Inc., no endere&ccedil;o
 * 59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.
 */
error_reporting ( 0 );
//
// pega as variaveis passadas com get ou post
//

include_once (dirname ( __FILE__ ) . "/../../../../../admin/php/login.php");
if (verificaOperacaoSessao ( "admin/html/atlas" ) === false) {
	header ( "HTTP/1.1 403 Vc nao pode realizar essa operacao" );
	exit ();
}
include (dirname ( __FILE__ ) . "/../../../../../admin/php/conexao.php");
include ("funcoes.php");
$id_atlas = $_POST["id_atlas"];
$id_prancha = $_POST["id_prancha"];
$id_tema = $_POST["id_tema"];

testaSafeNumerico([$id,$id_atlas,$id_prancha]);

$funcao = strtoupper ( $funcao );
switch ($funcao) {
	case "ADICIONAR" :
		$novo = \admin\catalogo\atlas\pranchas\temas\adicionar( $id_prancha, $_POST["ordem_tema"], $_POST["ligado_tema"], $_POST["codigo_tema"], $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
		}
		break;
	case "ALTERAR" :
		$novo = \admin\catalogo\atlas\pranchas\temas\alterar ( $id_tema, $_POST["ordem_tema"], $_POST["ligado_tema"], $_POST["codigo_tema"], $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
		}
		break;
	case "LISTAUNICO" :
		$dados =  \admin\catalogo\atlas\pranchas\temas\listar($dbh, $id_prancha, $id_tema);
		$dbhw = null;
		$dbh = null;
		if ($dados === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de temas de uma prancha" );
		} else {
			include("../../../../../admin/php/classe_arvore.php");
			$arvore = new Arvore($locaplic);
			$temas = $arvore->pegaTodosTemas(true);
			retornaJSON ( array("dados"=>$dados, "temas"=>$temas) );
		}
		break;
	case "LISTA" :
		$dados =  \admin\catalogo\atlas\pranchas\temas\listar($dbh, $id_prancha, $id_tema);
		$dbhw = null;
		$dbh = null;
		if ($dados === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de temas de uma prancha" );
		} else {
			//pega a lista de temas
			include("../../../../../admin/php/classe_arvore.php");
			$arvore = new Arvore($locaplic);
			$temas = $arvore->pegaTodosTemas(true);
			retornaJSON ( array("dados"=>$dados, "temas"=>$temas) );
		}
		break;
	case "EXCLUIR" :
		$retorna = \admin\catalogo\atlas\pranchas\temas\excluir ( $id_tema, $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($retorna === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
		}
		break;
	default:
		header ( "HTTP/1.1 500 erro funcao nao existe" );
		break;
}
?>