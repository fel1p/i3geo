<?php
// verifica login
session_write_close();
session_name("i3GeoLogin");
if (empty($_COOKIE["i3geocodigologin"])) {
    exit();
}
session_id($_COOKIE["i3geocodigologin"]);
session_start();
if ($_SESSION["usuario"] != $_COOKIE["i3geousuariologin"]) {
    $_COOKIE = array();
    $_SESSION = array();
    session_destroy();
    exit();
}
session_write_close();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta http-equiv="Category" content="i3Geo Mapa interativo MMA geoprocessamento sig mobile">
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
<title>i3GEO - OpenLayers</title>
<script src="../pacotes/ol4/ol.js"></script>
<script src="../js/i3geo.js"></script>
<script src="js/core.js"></script>
<!-- lista com os links que serao mostrados na guia ferramentas -->
<script src="../js/listaDeFerramentas.js"></script>
<!-- configuracoes default tipo pode ser OL (openLayers) ou GM (googlemaps) -->
<script src="../interface/config.php?tipo=OL"></script>
<link rel="stylesheet" type="text/css" href="../pacotes/ol4/ol.css">
<link rel="stylesheet" type="text/css" href="../pacotes/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../pacotes/bootstrap-material-design/dist/css/bootstrap-material-design.min.css">
<!-- <link rel="stylesheet" type="text/css" href="../pacotes/bootstrap-accessibility-plugin/plugins/js/bootstrap-accessibility.min.js"> -->
<link rel="stylesheet" type="text/css" href="../css/default.css">
<style>
.ol-attribution.ol-uncollapsible {
	height: 2.1em;
	right: 24px;
	background: none;
	margin-bottom: 15px;
}

.foraDoMapa+span>span {
	background-color: yellow;
}
</style>
</head>
<!-- As palavras entre {{{}}} sao utilizadas para a traducao. Veja i3geo/js/dicionario.js
		Marque com data-traduzir="true" os elementos que deverao passar pelo tradutor
	-->
<body id="i3geo" style='background: white;'>
    <!-- inclui o nome do usuario logado
    <div id="i3GEONomeLogin"
        style="position: absolute; left: 10px; top: 2px; font-size: 11px; z-index: 50000"></div>
    -->
    <!-- Aqui vai o mapa. O div a ser inserido e padronizado e depende da interface usar openlayers ou googlemaps
    Se os estilos width e height nao estiverem definidos, o tamanho do mapa abrangera a tela toda
    -->
    <div id="mapai3Geo"></div>
    <!-- aqui sera incluida a escala numerica. E necessario ter o id=i3GEOescalanum para que o valor seja atualizado-->
    <form class="escalanumerica hidden-xs" onsubmit="javascript:i3GEO.navega.aplicaEscala($i('i3GEOescalanum').value);return false;">
        <input id='i3GEOescalanum' type='text' name='' value='' size='10' title=''>
    </form>

    <!-- aqui sera incluido o gadget que mostra a coordenada geografica da posicao do mouse -->
    <div class="localizarxy fundoRodape hidden-xs hidden-sm">
        <div class="i3GeoMascaraCoord" style="display: block;">
            <select onchange="javascript:i3GEO.coordenadas.mudaTipo(this,'localizarxy');" class="i3geoCoordenadasComboTipo">
                <option>DMS:</option>
                <option value="janela">janela</option>
                <option value="geoProj">DMS</option>
                <option value="dd">Dec. de grau</option>
                <option value="geohash">GeoHash</option>
                <option value="policonicaSad69">Polic SAD-69</option>
                <option value="utmSad69Proj">UTM Sad-69</option>
                <option value="utmSirgas2000Proj">UTM Sirgas</option>
            </select>
        </div>
        <div class="i3GeoMascaraCoord" id="localizarxygeoProj" style="display: block; position: absolute; top: 0px; left: 60px;">
            X: <input name="" value="-00" size="3" title="grau" id="localizarxygeoProjxg" type="text"> <input name="" value="00" size="2" title="minuto" id="localizarxygeoProjxm" type="text">
            <input name="" value="00.00" size="5" title="segundo" id="localizarxygeoProjxs" type="text"> Y: <input name="" value="-00" size="3" title="grau" id="localizarxygeoProjyg"
                type="text"> <input name="" value="00" size="2" title="minuto" id="localizarxygeoProjym" type="text"> <input name="" value="00.00" size="5" title="segundo"
                id="localizarxygeoProjys" type="text"> <img class="ticfind" style="margin-left: 8px;" title="zoom" onclick="i3GEO.coordenadas.zoomPontoGeo()" src="../imagens/branco.gif">
        </div>
        <div id="localizarxydd" class="i3GeoMascaraCoord" style="display: none; position: absolute; top: 0px; left: 60px;">
            X: <input name="" value="00" size="12" title="X" id="localizarxyddX" type="text"> Y: <input name="" value="00" size="12" title="Y" id="localizarxyddY" type="text">
        </div>
        <div id="localizarxygeohash" class="i3GeoMascaraCoord" style="display: none; position: absolute; top: 0px; left: 60px;">
            GeoHash <input name="" value="00" size="12" title="Cod" id="localizarxygeohashCodigo" type="text"> <img class="ticfind" style="margin-left: 8px;" title="zoom"
                onclick="i3GEO.coordenadas.geohash.zoomCodigo('localizarxygeohashCodigo')" src="../imagens/branco.gif">
        </div>
        <div id="localizarxypoliconicaSad69" class="i3GeoMascaraCoord" style="display: none; position: absolute; top: 0px; left: 60px;">
            X: <input name="" value="00" size="12" title="X" id="localizarxypoliconicaSad69X" type="text"> Y: <input name="" value="00" size="12" title="Y" id="localizarxypoliconicaSad69Y"
                type="text">
        </div>
        <div id="localizarxyutmSad69Proj" class="i3GeoMascaraCoord" style="display: none; position: absolute; top: 0px; left: 60px;">
            X: <input name="" value="00" size="12" title="X" id="localizarxyutmSad69ProjX" type="text"> Y: <input name="" value="00" size="12" title="Y" id="localizarxyutmSad69ProjY"
                type="text"> Zn: <input name="" value="--" size="2" title="Zona" id="localizarxyutmSad69ProjZN" type="text">
        </div>
        <div id="localizarxyutmSirgas2000Proj" class="i3GeoMascaraCoord" style="display: none; position: absolute; top: 0px; left: 60px;">
            X: <input name="" value="00" size="12" title="X" id="localizarxyutmSirgas2000ProjX" type="text"> Y: <input name="" value="00" size="12" title="Y" id="localizarxyutmSirgas2000ProjY"
                type="text"> Zn: <input name="" value="--" size="2" title="Zona" id="localizarxyutmSirgas2000ProjZN" type="text">
        </div>
    </div>
    <!-- barra de icones de navegacao -->
    <div class="ol-i3GEOcontrols ol-control" data-traduzir="true">
        <button title="{{{d2t}}}" onclick="i3GEO.Interface.zoom2ext(i3GEO.parametros.extentTotal)" style="float: left;">
            <!--<img style="width:20px;" src="../imagens/gisicons/projection.png">-->
            <i class="material-icons">public</i>
        </button>
        <button onclick="i3GEO.Interface.zoomli()" style="float: left;">
            <!--<img style="width:20px;" src="../imagens/gisicons/zoom-region.png">-->
            <i class="material-icons">zoom_in</i>
        </button>
        <br>
        <button title="{{{volta}}}" onclick="i3GEO.navega.extensaoAnterior()" style="float: left;">
            <!--<img style="width:16px;" src="../imagens/oxygen/16x16/draw-triangle1.png">-->
            <i class="material-icons">undo</i>
        </button>
        <button title="{{{avanca}}}" onclick="i3GEO.navega.extensaoProximo()" style="float: left;">
            <!--<img style="width:16px;" src="../imagens/oxygen/16x16/draw-triangle2.png">-->
            <i class="material-icons">redo</i>
        </button>
        <br>
        <button title="{{{graticule}}}" onclick="i3GEO.Interface.grade()" style="float: left;">
            <!--<img style="width:16px;" src="../imagens/gisicons/graticule.png">-->
            <i class="material-icons">grid_on</i>
        </button>
        <button class="hidden-xs hidden-sm" title="{{{x79}}}" data-template="../interface/templates/ferramentasSend.html" onclick="i3GEO.marcador.inicia(this)" style="float: left;">
            <!--<img style="width:20px;" src="../imagens/gisicons/save1.png">-->
            <i class="material-icons">bookmark_border</i>
        </button>
        <br>
        <button class="hidden-xs hidden-sm" title="{{{d9}}}" onclick="i3GEO.maparef.inicia()" style="float: left;">
            <!--<img style="width:20px;" src="../imagens/gisicons/map-reference.png">-->
            <i class="material-icons">picture_in_picture</i>
        </button>
    </div>
    <!--barra de progresso que e mostrada conforme as camadas sao desenhadas no mapa. Esse elemento deve ter o id="i3GEOprogressoCamadas" -->
    <div id="i3GEOprogressoCamadas" class="progress" style="display: block; position: absolute; top: 0px; height: 5px; width: 0%; margin: auto;">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%"></div>
    </div>
    <!--barra de aguarde id="i3GEObarraAguarde" -->
    <div id="i3GEObarraAguarde" class="progress" style="display: block; position: absolute; top: 0px; height: 5px; width: 0%; margin: auto;">
        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style="width: 100%"></div>
    </div>
    <!-- mensagem de copyright -->
    <div id="i3GEOcopyright">i3Geo</div>
    <!-- botoes laterais que abrem guias moveis -->
    <div id="i3GEOguiaMovel">
        <!-- configuracao para todos os botoes
            data-idconteudo - id do DIV que contem o conteudo da guia e que sera mostrado ao ser clicado
        -->
        <div class="iconesGuiaMovel ol-control" data-traduzir="true">
            <!-- ferramentas
                data-idLista - id do DIV dentro de idconteudo que sera utilizado para mostrar as "pastas" que abrem o proximo nivel
                data-idLinks - id do DIV dentro de idconteudo que sera utilizado para mostrar a lista de links que abre cada ferramenta
                data-idMigalha - id do DIV que sera utilizado para mostrar o link de retorno ao nivel anterior
            -->
            <div data-idconteudo="guia8obj" data-idLinks="listaFerramentasLinks" data-idMigalha="migalhaFerramentas" data-idLista="listaFerramentas" onclick="i3GEO.guias.ativa('ferramentas',this)">
                <button title="{{{iconeFerramentas}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">business_center</i>
                </button>
            </div>
            <!-- temas existentes no mapa
                data-idListaDeCamadas - id onde sera incluida a lista de camadas
                data-idListaFundo - id onde sera incluida a lista de camadas de fundo (mapa base)
                data-verificaAbrangencia - se for uma string, faz a verificacao se a camada esta fora da abrangencia atual do mapa,
                    inserindo ou nao a string como uma classe CSS. Pode degradar a performance e depende
                    do metadata existente na camada. Deixe vazio para nao ativar a operacao.
            -->
            <div onclick="i3GEO.guias.ativa('temas',this)" data-verificaAbrangencia="" data-idconteudo="guia1obj" data-idListaFundo="listaFundo" data-idListaDeCamadas="listaTemas"
                style="margin-top: 3px;">
                <button title="{{{iconeMapa}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons"><i class="material-icons">visibility</i></i>
                </button>
            </div>
            <!-- catalogo de adicao de temas ao mapa
                data-idCatalogo - id do DIV que contem a primeira pagina do catalogo. Esse DIV sera escondido e mostrado conforme o usuario navega pelo catalogo
                data-idMenus - id do DIV que recebera a lista de menus cadastrados no sistema de administracao
                data-idNavegacao - id do DIV que recebera a lista de opcoes apos o usuario clicar em um item do catalogo principal
                data-idMigalha - id do DIV que recebera o link para retorno ao nivel anterior do catalogo

                Variaveis javascript:
                i3GEO.catalogoMenus.IDSMENUS - (array) apenas os menus com idmenu que constem nessa lista serao mostrados. Por default e vazio.
            -->
            <div onclick="i3GEO.guias.ativa('adiciona',this)" data-idconteudo="guia2obj" data-idMigalha="catalogoMigalha" data-idNavegacao="catalogoNavegacao" data-idCatalogo="catalogoPrincipal"
                data-idMenus="catalogoMenus" style="margin-top: 3px;">
                <button title="{{{iconeCatalogo}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">layers</i>
                </button>
            </div>
            <!-- legenda -->
            <div onclick="i3GEO.guias.ativa('legenda',this)" data-idconteudo="guia4obj" data-idLegenda="legendaHtml" style="margin-top: 3px;">
                <button title="{{{iconeLegenda}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">view_list</i>
                </button>
            </div>
            <div class="hidden-xs hidden-sm" onclick="i3GEO.guias.ativa('dobraPagina',this)" style="margin-top: 3px;">
                <button title="{{{trocaInterface}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">compare_arrows</i>
                </button>
            </div>
            <!-- Busca -->
            <div onclick="i3GEO.guias.ativa('buscaRapida',this)" data-idconteudo="guia7obj" style="margin-top: 3px;">
                <button class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">search</i>
                </button>
            </div>
            <div onclick="i3GEO.guias.ativa('identificaBalao',this)" style="margin-top: 3px;">
                <button title="{{{iconeBalao}}}" class="iconeGuiaMovel" style="color: white; box-shadow: none;">
                    <i class="material-icons">location_on</i>
                </button>
            </div>
            <!-- A opcao de identificacao esta integrada ao balao de informacoes, mas pode aparecer aqui tambem
            <div class="hidden-xs hidden-sm" onclick="i3GEO.guias.ativa('identifica',this)" style="margin-top: 3px;">
                <button title="{{{iconeIdentifica}}}" class="iconeGuiaMovel" style="box-shadow: none;">
                    <img src="../imagens/gisicons/pointer-info.png" style="cursor: pointer; padding: 3px;">
                </button>
            </div>
            -->
        </div>
        <!-- veja i3GEO.guias.CONFIGURA -->
        <!-- Os IDs sao definidos no botao que ativa a guia veja: "i3GEOguiaMovel" -->
        <!-- se height nao estiver definido sera utilizada a altura do mapa -->
        <div id="i3GEOguiaMovelMolde">
            <div id="i3GEOguiaMovelConteudo">
                <!-- camadas existentes no mapa -->
                <div id='guia1obj' data-traduzir="true" style='display: none;'>
                    <div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');">
                        <button>
                            <span class="pull-left">{{{iconeMapa}}}</span> <span class="pull-right material-icons">cancel</span>
                        </button>
                    </div>
                    <div class="separadorCabecalhoGuias">&nbsp;</div>
                    <div class="guiaOverflow">
                        <div class="list-group condensed noprint collapsed" data-toggle="collapse" data-target="#opcoesGuia1">
                            <label>{{{opcoes}}}</label>
                        </div>
                        <div class="text-left collapse noprint" id="opcoesGuia1" style="margin-left: 30px;">
                            <p>
                                <a onclick="i3GEO.arvoreDeCamadas.atualiza(i3GEO.arvoreDeCamadas.CAMADAS,true)" href="javascript:void(0)">Refresh</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.arvoreDeCamadas.aplicaTemas('ligartodos')" href="javascript:void(0)">{{{t3a}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.arvoreDeCamadas.aplicaTemas('desligartodos')" href="javascript:void(0)">{{{t3b}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.arvoreDeCamadas.dialogo.excluir()" href="javascript:void(0)">{{{t12}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.arvoreDeCamadas.dialogo.filtro()" href="javascript:void(0)">{{{t2a}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.mapa.dialogo.opacidade()" href="javascript:void(0)">{{{t20}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.mapa.dialogo.animacao()" href="javascript:void(0)">{{{p21}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.mapa.dialogo.imprimir()" href="javascript:void(0)">{{{d12}}}</a>
                            </p>
                            <p>
                                <a onclick="i3GEO.mapa.limpasel()" href="javascript:void(0)">{{{t4}}}</a>
                            </p>
                        </div>
                        <hr>
                        <!-- Esta div acrescenta a lista de de camadas dispon&iacute;veis no mapa atual -->
                        <div id="listaTemas" style="overflow: none;" data-template="../interface/templates/camada.html"></div>
                        <!-- Esta div acrescenta a lista de de camadas de fundo
                    A lista de camadas de fundo e obtida da variavel i3GEO.Interface.openlayers.LAYERSADICIONAIS
                    Essa variavel e definida via javascript, e no caso das interfaces padrao do i3Geo, e definida
                    no programa interface/config.php
                    -->
                        <div data-toggle="collapse" data-target="#collapseFundo" class="list-group condensed collapsed">
                            <label>{{{camadasDeFundo}}}</label>
                        </div>
                        <div style="margin-left: 0px;" class="collapse text-left" id="collapseFundo">
                            <form>
                                <div id="listaFundo" class="form-group condensed" data-template="../interface/templates/camadaFundo.html"></div>
                            </form>
                        </div>

                    </div>
                </div>
                <!-- Catalogo de temas -->
                <div id='guia2obj' data-traduzir="true" style='display: none; text-align: left;'>
                    <div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');i3GEO.catalogoMenus.mostraCatalogoPrincipal();">
                        <button>
                            <span class="pull-left">{{{iconeCatalogo}}}</span> <span class="pull-right material-icons">cancel</span>
                        </button>
                    </div>
                    <div class="separadorCabecalhoGuias">&nbsp;</div>
                    <div class="guiaOverflow">
                        <!-- aqui entra a lista de elementos quando uma das opcoes e clicada -->
                        <div id="catalogoMigalha" data-template="../interface/templates/catalogoMigalha.html"></div>
                        <div id="catalogoNavegacao"></div>
                        <!-- Opcoes -->
                        <div id="catalogoPrincipal">
                            <div data-toggle="collapse" data-target="#opcoesGuia2" class="list-group condensed collapsed noprint">
                                <label>{{{opcoes}}}</label>
                            </div>
                            <div class="text-left collapse" id="opcoesGuia2" style="margin-left: 30px;">
                                <p>
                                    <a href="javascript:void(0)" onclick="i3GEO.login.dialogo.abreLogin()">Login/Logout</a>
                                </p>
                                <p>
                                    <!-- <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.atualiza()">Refresh</a> -->
                                </p>
                                <li class="divider"></p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.conectaservico()">{{{a15}}}</a>
                                    </p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.uploadarquivo()">{{{a14}}}</a>
                                    </p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.downloadbase()">{{{a3}}}</a>
                                    </p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.importarwmc()">{{{a3a}}}</a>
                                    </p>
                                    <p>
                                        <!-- <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.nuvemTags()">{{{a5a}}}</a> -->
                                    </p>
                                    <p>
                                        <!-- <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.carouselTemas()">Miniaturas</a> -->
                                    </p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.arvoreDeTemas.dialogo.buscaInde()">Busca na INDE</a>
                                    </p>
                                    <p>
                                        <a href="javascript:void(0)" onclick="i3GEO.mapa.dialogo.metaestat()">Cartogramas estatisticos</a>
                                    </p>
                                    <p>
                                        <a href="http://localhost/i3geo/kml.php?tipoxml=kml" target="_blank">{{{a13}}}</a>
                                    </p>
                            </div>

                            <hr>
                            <!-- busca tema no catalogo
                        <div class="form-group label-floating">
                            <label class="control-label" for="i3GEObuscatema">{{{a1}}}</label>
                            <div class="input-group">
                                <input id="i3GEObuscatema" class="form-control" type="text" value="">
                                <span class="input-group-btn">
                                    <a onclick="i3GEO.arvoreDeTemas.buscaTema2($i('i3GEObuscatema').value);return false;" role="button" type="button" class="btn btn-warning btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">send</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                         -->
                            <!-- A lista de menus e uma funcao de i3GEO.guias.CONFIGURA.adiciona
                            Nessa funcao ficam tambem os parametros:
                            "idOndeMenus": "catalogoMenus",
                            "idCatalogoPrincipal": "catalogoPrincipal",
                            "idCatalogoNavegacao": "catalogoNavegacao",
                            "idOndeMigalha": "catalogoMigalha"
                        -->
                            <div id="catalogoMenus" data-templateDir="../interface/templates/dir.html" data-templateTema="../interface/templates/tema.html"></div>

                            <div id="arvoreAdicionaTema"></div>

                            <!--
                        As funcoes de inicializacao recebem um objeto com parametros. Que por padrao sao:
                        config: {
                            'templateDir': '../interface/templates/dir.html',
                            'templateTema': '../interface/templates/tema.html',
                            'idCatalogoPrincipal': 'catalogoPrincipal',
                            'idCatalogoNavegacao': 'catalogoNavegacao',
                            'idOndeMigalha': 'catalogoMigalha'
                        }

                        exemplo:

                        onclick="i3GEO.catalogoInde.inicia({'templateDir': '../interface/templates/dir.html','templateTema': '../interface/templates/tema.html','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})"
                        -->

                            <!-- servicos da INDE brasileira -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoInde.inicia()" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoInde.inicia()" role="button" href="javascript:void(0)">
                                            <h4>INDE-Br</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>Infraestrutura Nacional de Dados Espaciais do Brasil</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!-- lista de wms cadastrados no sistema de administracao -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoOgc.inicia();return false;" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoOgc.inicia()" role="button" href="javascript:void(0)">
                                            <h4>OGC-WMS</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descOgcWms}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!--  regioes cadastradas no sistema de metadados -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoRegioes.inicia()" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoRegioes.inicia()" role="button" href="javascript:void(0)">
                                            <h4>{{{x87}}}</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descLimLoc}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!--  camadas que vem do sistema de metadados estatisticos -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoMetaestat.inicia()" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoMetaestat.inicia()" role="button" href="javascript:void(0)">
                                            <h4>{{{x57}}}</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descMeta}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!--  mapas cadastrados no sistema de administracao (nao funcional)
                        <div class="list-group condensed"><div class="row-content text-left">
                            <a onclick="i3GEO.catalogoMapas.inicia({'seletorTemplateDir': '#guia2objTemplateDir','seletorTemplateTema': '#guia2objTemplateTema','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})" role="button" class="btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)"><span class="material-icons ">folder_open</span></a>
                            <label style="width: 255px;vertical-align: middle;">
                                <a onclick="i3GEO.catalogoMapas.inicia({'seletorTemplateDir': '#guia2objTemplateDir','seletorTemplateTema': '#guia2objTemplateTema','idCatalogoPrincipal':'catalogoPrincipal','idCatalogoNavegacao':'catalogoNavegacao','idOndeMigalha':'catalogoMigalha'})" role="button" href="javascript:void(0)">
                                <h4>{{{x90}}}</h4></a>
                                <h6>{{{descMapas}}}</h6>
                            </label>
                        </div></div><hr>
                        -->
                            <!--  camadas por estrelas -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoEstrelas.inicia({'valorEstrela':5,'numEstrelas':1})" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max"
                                        href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoEstrelas.inicia({'valorEstrela':5,'numEstrelas':1})" role="button"
                                            href="javascript:void(0)">
                                            <h4>{{{t46}}}</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descEstrelas}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!--  sistemas que adicionam camadas -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoSistemas.inicia()" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoSistemas.inicia()" role="button" href="javascript:void(0)">
                                            <h4>{{{a11}}}</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descSistemas}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                            <!--  navegacao em diretorios -->
                            <div class="list-group condensed">
                                <div class="row-content text-left">
                                    <a onclick="i3GEO.catalogoDir.inicia()" role="button" class="hidden-xs hidden-sm btn btn-primary btn-fab btn-fab-max" href="javascript:void(0)">
                                        <span class="material-icons ">folder_open</span>
                                    </a>
                                    <label style="width: 255px; vertical-align: middle;"> <a onclick="i3GEO.catalogoDir.inicia()" role="button" href="javascript:void(0)">
                                            <h4>{{{a6}}}</h4>
                                            <i class="pull-right material-icons">navigate_next</i>
                                        </a>
                                        <h6>{{{descDir}}}</h6>
                                    </label>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
                <!-- Legenda -->
                <div data-traduzir="true" id='guia4obj' style='display: none; text-align: left'>
                    <div class="i3GEOfechaGuia" onclick="i3GEO.legenda.off('legendaHtml');i3GEO.guias.abreFecha('fecha');">
                        <button>
                            <span class="pull-left">{{{iconeLegenda}}}</span> <span class="pull-right material-icons">cancel</span>
                        </button>
                    </div>
                    <div class="separadorCabecalhoGuias">&nbsp;</div>
                    <div class="guiaOverflow">
                        <a href='javascript:void(0)' onclick="i3GEO.legenda.inicia({'janela':true})">{{{x11}}}</a>
                        <div id="legendaHtml" data-template="../interface/templates/legenda.html" data-size="35,25" style='display: none; text-align: left'></div>
                    </div>
                </div>
                <!-- busca
                Funcoes de busca por registros. Pode ser feita nos temas existentes no mapa, em um servico de busca e no google
                No botao que dispara a busca, ficam os parametros de configuracao
                Esses parametros indicam qual o checkbox que define o tipo de busca, o local onde os dados serao mostrados e o template para formatar o resultado
                -->
                <div data-traduzir="true" id='guia7obj' style='display: none; text-align: left'>
                    <div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');">
                        <button>
                            <span class="pull-left">{{{t23}}}</span> <span class="pull-right material-icons">cancel</span>
                        </button>
                    </div>
                    <div class="separadorCabecalhoGuias">&nbsp;</div>
                    <div class="guiaOverflow">
                        <form onSubmit="return false;">
                            <div class="form-group label-floating">
                                <label class="control-label" for="valorBuscaRapida">{{{x36}}}</label>
                                <div class="input-group">
                                    <input class="form-control" type="text" value="" name="valorBuscaRapida"> <span class="input-group-btn"> <a
                                            onclick="i3GEO.busca.inicia(this);return false;" data-templateGoogle="../interface/templates/buscaEmTemas.html" data-inputGoogle="[name=google]"
                                            data-ondeGoogle=".i3GEOresultadoBuscaGoogle" data-templateTemasMapa="../interface/templates/buscaEmTemas.html" data-inputTemasMapa="[name=temasMapa]"
                                            data-ondeTemasMapa=".i3GEOresultadoBuscaTemasMapa" data-templateServico="../interface/templates/buscaEmServico.html" data-ondeConteiner="#guia7obj"
                                            data-inputOndePalavra="[name=valorBuscaRapida]" data-inputServicosExternos="[name=servicosExternos]"
                                            data-ondeServicosExternos=".i3GEOresultadoBuscaServicos" role="button" type="button" class="btn btn-warning btn-fab btn-fab-max" href="javascript:void(0)">
                                            <span class="material-icons ">send</span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <h4>{{{x37}}}:</h4>
                            <div class="form-inline" style="width: 100%;">
                                <div class="list-group condensed">
                                    <div class="checkbox text-left">
                                        <label> <input checked class="noprint" value="on" type="checkbox" value="" name="servicosExternos"> {{{x38}}}
                                        </label>
                                    </div>
                                </div>
                                <div class="list-group condensed">
                                    <div class="checkbox text-left">
                                        <label> <input class="noprint" value="on" type="checkbox" name="temasMapa"> {{{x39}}}
                                        </label>
                                    </div>
                                </div>
                                <!-- Apenas para a interface google maps
                            <div class="list-group condensed">
                                <div class="checkbox text-left">
                                <label>
                                    <input class="noprint" value="on" type="checkbox" name="google">
                                    <span class="checkbox-material noprint"><span class="check"></span></span> Google
                                </label>
                                </div>
                            </div>
                             -->
                            </div>
                        </form>
                        <hr>
                        <div class="i3GEOresultadoBuscaServicos"></div>
                        <div class="i3GEOresultadoBuscaTemasMapa"></div>
                        <div class="i3GEOresultadoBuscaGoogle"></div>
                        <div class="alert alert-info" role="alert">{{{x40}}}</div>
                    </div>
                </div>
                <!-- Ferramentas -->
                <div data-traduzir="true" id='guia8obj' style='display: none; text-align: left'>
                    <div class="i3GEOfechaGuia" onclick="i3GEO.guias.abreFecha('fecha');">
                        <button>
                            <span class="pull-left">{{{iconeFerramentas}}}</span> <span class="pull-right material-icons">cancel</span>
                        </button>
                    </div>
                    <div class="separadorCabecalhoGuias">&nbsp;</div>
                    <div class="guiaOverflow">
                        <div class="form-inline" style="width: 100%;">
                            <div class="text-center form-group" style="margin: 4px;">
                                <a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.analise.dialogo.area();" role="button" class="btn btn-success btn-fab btn-fab-max" href="javascript:void(0)">
                                    <img style="margin-top: 4px;" src="../imagens/gisicons/area-measure.png">
                                </a>
                                <h6>{{{d21at}}}</h6>
                            </div>
                            <div class="text-center form-group" style="margin: 4px;">
                                <a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.analise.dialogo.distancia();" role="button" class="btn btn-success btn-fab btn-fab-max" href="javascript:void(0)">
                                    <img style="margin-top: 4px;" src="../imagens/gisicons/length-measure.png">
                                </a>
                                <h6>{{{d21t}}}</h6>
                            </div>
                            <div class="text-center form-group" style="margin: 4px;">
                                <a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.mapa.dialogo.selecao();" role="button" class="btn btn-success btn-fab btn-fab-max" href="javascript:void(0)">
                                    <img style="margin-top: 4px;" src="../imagens/gisicons/select.png">
                                </a>
                                <h6>{{{d24t}}}</h6>
                            </div>
                            <div class="text-center form-group" style="margin: 4px;">
                                <a onclick="i3GEO.guias.abreFecha('fecha');i3GEO.mapa.dialogo.geolocal();" role="button" class="btn btn-success btn-fab btn-fab-max" href="javascript:void(0)">
                                    <img style="margin-top: 4px;" src="../imagens/gisicons/layer-gps.png">
                                </a>
                                <h6>{{{localiza}}}</h6>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <hr>
                        <div id="migalhaFerramentas" data-template="../interface/templates/ferramentasMigalha.html" style='display: block; text-align: left;'></div>
                        <div id="listaFerramentasLinks" data-template="../interface/templates/ferramentasLink.html" style='display: block; text-align: left'></div>
                        <div id="listaFerramentas" data-template="../interface/templates/ferramentasFolder.html" style='display: block; text-align: left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  para mostrar o banner de abertura -->
    <script id="i3GEOlogoMarcaTemplate" type="x-tmpl-mustache">
	<div>
		<table>
			<tr>
				<td>
					<h4 >i3Geo - Software livre para cria&ccedil;&atilde;o de mapas
						interativos e geoprocessamento</h4>
					<h4 >Baseado no Mapserver, &eacute; licenciado sob GPL e integra o
						Portal do Software P&uacute;blico Brasileiro</h4>
				</td>
			</tr>
		</table>
		<img class="img-thumbnail" src="../imagens/i3Geo_big.png" style="width:50px">
		<img class="img-thumbnail" src="../imagens/mapserv.png" style="width:50px">
		<img class="img-thumbnail" src="../imagens/pspb.png" style="width:50px">
		<div>&nbsp;</div>
	</div>
	</script>
    <script>
	//ativa o banner de inicializacao
	i3GEO.janela.tempoMsg($i("i3GEOlogoMarcaTemplate").innerHTML,4000);
	(function() {
		//parametros aplicados na criacao do arquivo mapfile
		var parametrosMapa = {
							//arquivo mapfile que servira de base para a criacao do mapa. Por default, sao utilizados os arquivos existentes em i3geo/aplicmap (geral1windows, geral1,...)
			//Essa variavel pode ser definida em ms_configura tambem. Se nao estiver definida em nenhum lugar, o i3Geo tentara descobrir o arquivo adequado a ser utilizado. Voce pode utilizar essa opcao para abrir um mapa com as camadas que voce quiser, mas para evitar redund�ncias, prefira o uso de &temasa
			mapfilebase: "",
			//extensao geografica do mapa
			//deve ser definida em coordenadas no formato decimos de grau e na projecao geografica na sequencia xmin ymin xmax ymax
			//exemplo [-77,-26,-30,6]
			mapext: [<?php echo strip_tags($_GET["mapext"]); ?>],
			//perfil utilizado para restringir os menus de temas mostrando apenas os que correspondem a determinado perfil
			perfil: "",
			//layers que serao adicionados ao mapa.

				layers: {
					add: ["<?php echo strip_tags($_GET["temaEdicao"]); ?>"],
					on: ["<?php echo strip_tags($_GET["temaEdicao"]); ?>"],
					off: []
				},
							points: {
				//array com a lista de coordenadas
				coord: [],
				//titulo da nova camada
				title: ""
			},
			//lista de coordenadas x e y que serao adicionadas como linhas no mapa
			lines: {
				//array de arrays com a lista de coordenadas de cada linha
				//exemplo [[-54,-12,-50,-12],[-50,-1,-50,-2,-50,-3]]
				coord: [[]],
				//titulo da nova camada
				title:""
			},
			//lista de coordenadas x e y que serao adicionadas como poligonos no mapa
			polygons: {
				//array de arrays com a lista de coordenadas de cada poligono. A primeira coordenada deve ser igual a ultima.
				//exemplo [[-50,-1,-48,-2,-50,-3,-50,-1]]
				coord: [[]],
				//titulo da nova camada
				title:""
			},
			//insere elementos no mapa com coordenadas definidas em wkt
			wkt: {
				//string no formato wkt
				coord: "",
				//titulo da nova camada
				title: ""
			},
			//simbolo que sera utilizado para desenhar os elementos inseridos
			symbol: {
				//codigo do simbolo conforme definido em i3geo/symbols
				name: "",
				//em rgb, exemplo "0 255 0"
				color: "",
				//em pixels
				size: ""
			},
			//arquivo KML que sera incluido no mapa. Valido apenas na interface google maps
			kml: {
				url: ""
			},
			//endereco de um WMS (sera incluido como uma camada no mapa)
			wms: {
				url: "",
				layer: "",
				style: "",
				title: "",
				srs: "",
				imagetype: "",
				version: ""
			},
			//filtros que serao aplicados aos layers. Utilize a expressaso conforme definido na documentacao
			//do mapserver, exemplo
			//{layer: "_lbiomashp",expression: "(('[CD_LEGENDA]'='CAATINGA'))"} ou {layer: "_lbiomashp",expression: "cd_legenda='CAATINGA'"}
			filters: [{
				layer: "",
				expression: ""
			}],
			//id de um mapa salvo e que sera recuperado
			restoreMapId : ""
		};
		var config = {
			//id do elemento HTML onde o corpo do mapa sera renderizado
			mapBody : "mapai3Geo",
			//tipo de mapa. Pode ser:
			//OL - utiliza o OpenLayers e coordenadas geograficas
			//OSM - utiliza o OpenLayers e o OpenStreetMap como fundo, em projecao semelhante ao GoogleMaps
			//GM - utiliza o GoogleMaps como motor de controle do mapa
			mapType : "OL",
			//armazena em um cookie a ultima extensao geografica do mapa e utiliza essa extensao quando o mapa for aberto
			saveExtension : false,
			//aplica um filtro de cores apos a renderizacao da imagem de cada camada que compoe o mapa cinza|sepiaclara|sepianormal
			posRenderType : "",
			//Altura e largura do tooltip (balao identifica)
			toolTipSize : ["100px","200px"],
			//Endereco do servidor i3Geo. Utilizado para gerar as requisicoes AJAX
			//Por default e definido como: i3GEO.util.protocolo() + "://" + window.location.host + "/i3geo"
			//Para facilitar as coisas, i3GeoUrl e definida em interface/config.php
			i3GeoServer : i3GeoUrl,
			//Funcao que sera executada apos a inicializacao do mapa
			afterStart : function(){
				$('.iconeGuiaMovel').tooltip({animation: false, trigger: "manual", placement: "left"});
				$('.iconeGuiaMovel').tooltip('show');
				$("#i3GEOguiaMovelConteudo").mCustomScrollbar({scrollbarPosition: "outside",theme:"inset-2-dark"});

				i3GEO.mapa.ativaTema("<?php echo strip_tags($_GET["temaEdicao"]); ?>");
				i3GEO.mapa.dialogo.atalhosedicao();
			},
            //parametros de configuracao de diferentes componentes do mapa, como o catalogo de temas, balao de info, etc
            components : {
                //define se ao clicar no mapa sera feita a busca de atributos nas camadas existentes no mapa
                info: true,
                //lista com os codigos dos menus que serao considerados na montagem do catalogo de temas
                idsMenus : [],
                //webservice utilizado na opcao de encontrar lugares
                searchService : "http://mapas.mma.gov.br/webservices/geonames.php",
                //webservice wms que faz a apresentacao do lugar encontrado por searchService
                searchWms : "http://mapas.mma.gov.br/webservices/geonameswms.php",
                //posicao do mapa de referencia, em pixels [top,right]
                referenceMapPosition : [4,120],
                //propriedades do balao de informacoes mostrado quando o usuario clica no mapa
                tooltip : {
                    //o resultado sera mostrado em uma janela do tipo modal
                    modal : false,
                    //url que sera utilizada para obter os dados via $.get. Deve estar no mesmo dominio do i3Geo.
                    //Ao final da url serao inseridos os parametros &xx=&yy= com valores em decimos de grau
                    //use apenas se modal for true
                    //exemplo: http://i3geo.saude.gov.br/i3geo/sage_tabelas/odm/odm6.php?
                    url: "",
                    //template que sera usado para compor o resultado da busca de dados
                    //se for vazio, serao utilizadas as outras opcoes
                    //se contiver a string {{{url}}} a mesma sera substituida por url
                    //exemplo: "<iframe style='width:400px;height:190px;border:0px white solid' src='{{{url}}}'></iframe>"
                    templateModal: "",
                    //serao mostrados todos os dados ou apenas aqueles definidos na configuracao da camada
                    simple: true,
                    removeAoAdicionar : true,
                    //parametros exclusivos da interface openlayers
                    autoPan : true,
                    autoPanAnimation : {
                        duration : 250
                    },
                    minWidth : '200px',
                    //Altura e largura do tooltip (balao)
                    toolTipSize : ["100px","200px"]
                },
                //barra de rolagem - ver plugin jquery https://github.com/malihu/malihu-custom-scrollbar-plugin
                scrollBar: {
                    theme: "inset-2",
                    axis: "yx",
                    scrollbarPosition: "inside",
                    scrollButtons:{ enable: false },
                    advanced:{ autoExpandHorizontalScroll: true }
                }
            },
            //parametros de configuracao das ferramentas que sao acionadas sob demanda
            //ferramentas localizadas em i3geo/ferramentas
            tools : {
                //ferramenta de busca de camadas em um servico CSW
                buscainde : {
                    //endereco do servico no padrao CSW
                    csw : "http://www.metadados.inde.gov.br/geonetwork/srv/br"
                },
                //ferramenta de identificacao
                identifica : {
                    //resolucao em pixels para busca de elementos
                    resolution : 8
                }
            },
			//configuracoes especificas para a interface que utiliza o OpenLayers
			openLayers : {
				//utiliza ou nao tiles ao renderizar as camadas do mapa
				//a utilizacao de tiles pode ser definida em cada camada, mas se essa propriedade for true, a definicao das camadas nao serao consideradas
				singleTile : false,
				//opcoes de inicializacao do mapa conforme definido na API do OpenLayers
				MapOptions : {
					layers : [],
					controls : [
						new ol.control.Zoom(),
						new ol.control.ZoomSlider(),
						new ol.control.ScaleLine(),
						new ol.control.Attribution({
							collapsible: true
						})
					],
					loadTilesWhileAnimating : true,
					loadTilesWhileInteracting : true,
					//os objetos devem ser comentados na interface googleMaps
					interactions : [
						new ol.interaction.DoubleClickZoom(),
						new ol.interaction.KeyboardPan(),
						new ol.interaction.KeyboardZoom(),
						new ol.interaction.MouseWheelZoom(),
						new ol.interaction.PinchRotate(),
						new ol.interaction.PinchZoom(),
						//new ol.interaction.DragZoom(),
                        i3GEO.navega.dragZoom(),
						new ol.interaction.DragPan()
					]
				},
				//opcoes para o objeto view, que e uma instancia de MapOptions
				ViewOptions : {

				}
			}
		};
		//
		//inicia o mapa
		//Veja tambem config.php
		//
		//O primeiro parametro permite alterar o mapa, inserindo camadas e outras definicoes que afetam o corpo do mapa
		//O segundo parametro inclui configuracoes que afetam o funcionamento da interface que controla a visualizacao do mapa
		//
		i3GEO.init(parametrosMapa,config);
	})();
	</script>
</body>

</html>
