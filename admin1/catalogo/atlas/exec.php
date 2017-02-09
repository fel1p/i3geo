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

include_once (dirname ( __FILE__ ) . "/../../../admin/php/login.php");
if (verificaOperacaoSessao ( "admin/html/atlas" ) === false) {
	header ( "HTTP/1.1 403 Vc nao pode realizar essa operacao" );
	exit ();
}

include (dirname ( __FILE__ ) . "/../../../admin/php/conexao.php");
include ("funcoes.php");
$id = $_POST["id"];
$id_atlas = $_POST["id_atlas"];
$id_prancha = $_POST["id_prancha"];

testaSafeNumerico([$id,$id_atlas,$id_prancha]);

$funcao = strtoupper ( $funcao );
switch ($funcao) {
	case "ADICIONAR" :
		$novo = \admin\catalogo\atlas\adicionar( $_POST["titulo_atlas"], $_POST["publicado_atlas"], $_POST["ordem_atlas"], $_POST["basemapfile_atlas"], $_POST["desc_atlas"], $_POST["h_atlas"], $_POST["w_atlas"], $_POST["icone_atlas"], $_POST["link_atlas"], $_POST["pranchadefault_atlas"], $_POST["template_atlas"], $_POST["tipoguias_atlas"], $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
		}
		break;
	case "ALTERAR" :
		$novo = \admin\catalogo\atlas\alterar ( $id_atlas, $_POST["titulo_atlas"], $_POST["publicado_atlas"], $_POST["ordem_atlas"], $_POST["basemapfile_atlas"], $_POST["desc_atlas"], $_POST["h_atlas"], $_POST["w_atlas"], $_POST["icone_atlas"], $_POST["link_atlas"], $_POST["pranchadefault_atlas"], $_POST["template_atlas"], $_POST["tipoguias_atlas"], $dbhw );
		$dbhw = null;
		$dbh = null;
		if ($novo === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados" );
			exit ();
		}
		break;
	case "LISTAUNICO" :
		$dados =  \admin\catalogo\atlas\listar ($dbh, $id_atlas);
		$dbhw = null;
		$dbh = null;
		if ($dados === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de atlas" );
			exit ();
		}
		retornaJSON ( array("dados"=>$dados) );
		break;
	case "LISTA" :
		$dados =  \admin\catalogo\atlas\listar ($dbh);
		$dbhw = null;
		$dbh = null;
		if ($dados === false) {
			header ( "HTTP/1.1 500 erro ao consultar banco de dados tabela de atlas" );
			exit ();
		}
		retornaJSON ( array("dados"=>$dados) );
		break;
	case "EXCLUIR" :
		$retorna = \admin\catalogo\atlas\excluir ( $id_atlas, $dbhw );
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