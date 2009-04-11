g_traducao_ajuda = {
	ferramentas: {
		"1": {
			titulo: "Filtro de cores",
			diretorio:"i3geo/ferramentas/tipoimagem",
			categoria:"1",
			pt:"O filtro possibilita gerar efeitos de colora��o no mapa. � aplicado sobre a imagem gerada toda vez que o mapa � alterado. No caso de temas baseados em dados RASTER, os n�veis de cores obtidos com a ferramenta de identifica��o n�o s�o alterados.",
			complemento:"Os filtros podem provocar um tempo maior de desenho do mapa, devendo ser utilizados com cuidado. As op��es s�pia e tons de cinza utilizam algor�tmos pr�prios do i3Geo, j� as demais, utilizam a op��o de filtro dispon�vel com o PHP 5. Mais detalhes <a href='http://www.php.net/manual/pt_BR/function.imagefilter.php' >aqui</a>."
		},
		"2": {
			titulo: "Legenda",
			diretorio:"i3geo/ferramentas/opcoes_legenda",
			categoria:"1",
			pt:"A legenda do mapa � utilizada em v�rias op��es do i3Geo e pode tamb�m ficar inserida na pr�pria imagem do mapa. A legenda mostra os s�mbolos utilizados no desenho de cada tema, podendo-se alterar caracter�sticas como fonte, tamanho dos textos, tamanho dos ret�ngulos com os s�mbolos, etc.",
			complemento:"Antes de aplicar uma altera��o, voc� pode testar os par�metros escolhidos para avaliar o resultado. No caso dos par�metros que definem cores, utilize -1,-1,-1 para anular seu efeito."
		},
		"3": {
			titulo: "Barra de escala",
			diretorio:"i3geo/ferramentas/opcoes_escala",
			categoria:"1",
			pt:"A barra de escala � uma imagem inserida no mapa que mostra a rela��o entre uma medida feita no mapa e no mundo real. A barra pode ser modificada especificando-se seu tamanho, n�mero de divis�es e cores.",
			complemento:"Existem dois modelos b�sicos para a escala: linear e bloco. Para n�o mostrar a escala no mapa, escolha a 'sem escala' na op��o estilo."
		},
		"4": {
			titulo: "Tamanho do mapa",
			diretorio:"i3geo/ferramentas/opcoes_tamanho",
			categoria:"1",
			pt:"O tamanho do mapa � definido automaticamente quando o i3Geo � aberto, buscando-se otimizar o uso do espa�o dispon�vel no monitor. A op��o de modifica��o do tamanho altera apenas o corpo do mapa, for�ando o ajuste dos outros elementos, o que nem sempre provoca bons resultados.",
			complemento:"O ajuste do tamanho do mapa pode ser utilizado para gerar imagens em tamanhos espec�ficos, principalmente para efeitos de impress�o. A medida do tamanho utilizado � pixel, que corresponde ao tamanho m�nimo de uma c�lula da imagem do mapa. Para calcular o tamanho do mapa em outra unidade de medida, necess�rio nos casos em que se deseja imprimir o mapa, deve ser feito considerando-se a resolu��o de impress�o desejada."
		},
		"5": {
			titulo: "Cor da sele��o",
			diretorio:"i3geo/ferramentas/opcoes_querymap",
			categoria:"1",
			pt:"A cor da sele��o � utilizada para mostrar no mapa os elementos de um determinado tema que est�o selecionados. A sele��o consiste em destacar elementos para uso em determinadas opera��es, como por exemplo o c�lculo de entorno (buffer). A defini��o da cor � baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.",
			complemento:"Ao definir os valores de RGB, separe-os com ','. Quando um tema possuir elementos selecionados, � inclu�da uma marca antes do nome do tema na lista de camadas dispon�veis no mapa."
		},
		"6": {
			titulo: "Cor do fundo",
			diretorio:"i3geo/ferramentas/opcoes_fundo",
			categoria:"1",
			pt:"O corpo do mapa � constitu�do por uma imagem gerada com tamanho fixo. Essa imagem possu� uma cor padr�o, sobre a qual s�o sobrepostas as camadas. Por padr�o, a cor do fundo � definida como azul. A defini��o da cor � baseada no modelo R,G,B, sendo que cada componente varia de 0 a 255.",
			complemento:"Ao definir os valores de RGB, separe-os com ','. Ao utilizar as op��es de convers�o do mapa atual para kml ou WMS, a altera��o da cor do fundo para 255,255,255 oferece melhores resultados na visualiza��o dos dados."
		},
		"7": {
			titulo: "Grade de coordenadas",
			diretorio:"i3geo/ferramentas/gradecoord",
			categoria:"1",
			pt:"A grade de coordenadas � formada por linhas verticais e horizontais representando determinadas latitudes e longitudes. A grade � um dos elementos principais na defini��o de um mapa, sendo utilizada na impress�o ou gera��o de figuras.",
			complemento:"Ao adicionar uma grade, � criado uma nova camada no mapa, possibilitando que mais de uma grade seja criada. Uma grade pode ou n�o conter os textos indicando os valores de lat long, permitindo que se crie uma grade com espa�amento de linhas diferente do espa�amento dos textos."
		},
		"8": {
			titulo: "Templates",
			diretorio:"i3geo/ferramentas/template",
			categoria:"1",
			pt:"Um template define como os componentes de um mapa s�o organizados no navegador. O administrador do i3Geo pode criar templates diferentes conforme as necessidades do usu�rio, sendo que alguns templates s�o fornecidos com o pr�prio i3Geo.",
			complemento:"A cria��o de templates � uma tarefa do administrador do i3Geo. Para abrir um template espec�fico diretamente, utilize a URL que � mostrada no navegador quando um template � escolhido."
		},
		"9": {
			titulo: "Temporizador",
			diretorio:"i3geo/ferramentas/opcoes_autoredesenha",
			categoria:"1",
			pt:"O temporizador permite definir um intervalo de tempo em segundos que ir� disparar o redesenho do mapa.",
			complemento:"Quando o mapa � redesenhado, as camadas existentes s�o lidas novamente para compor o novo mapa. Essa op��o � �til quando existirem camadas no mapa que sofrem atualiza��es frequentes, como por exemplo o deslocamento de aeronaves, carros ou navios."
		},
		"10": {
			titulo: "Salvar mapa",
			diretorio:"i3geo/ferramentas/salvamapa",
			categoria:"2",
			pt:"O mapa que o usu�rio est� utilizando pode ser salvo localmente (na m�quina do usu�rio) para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso � sempre perdido quando o usu�rio fecha o navegador.",
			complemento:"Os dados locais que foram criados n�o s�o salvos, sendo necess�rio o seu download quando desejado. Isso afeta as op��es de inclus�o de pontos ou convers�o de elementos selecionados em camadas."
		},
		"11": {
			titulo: "Carregar mapa",
			diretorio:"i3geo/ferramentas/carregamapa",
			categoria:"2",
			pt:"O mapa que o usu�rio est� utilizando pode ser salvo localmente (na m�quina do usu�rio) para ser aberto posteriormente. Isso permite que um trabalho seja continuado em outro momento, uma vez que o mapa em uso � sempre perdido quando o usu�rio fecha o navegador.",
			complemento:"A op��o de carregar um mapa permite enviar para o servidor, onde o i3Geo est� instalado, o mapa que foi salvo anteriormente."
		},
		"12": {
			titulo: "Converter em WMS",
			diretorio:"i3geo/ferramentas/convertews",
			categoria:"2",
			pt:"Convertendo o mapa atual em um WMS � poss�vel utilizar outros softwares para visualizar o mesmo mapa visto no i3Geo. O resultado da convers�o � um endere�o (url) tempor�rio, esse endere�o deve ser inserido no software que se quer usar e que suporte WMS.",
			complemento:"WMS � um padr�o internacional e n�o espec�fico do i3Geo. Utilizando um WMS, pode-se adicionar ao mapa outras camadas de dados, inclusive dados locais, se estiver sendo utilizado um software instalado em um computador local. Conforme as caracter�sticas de cada servidor onde o i3Geo estiver instalado, o WMS poder� permanecer dispon�vel por per�odos de tempo vari�veis. Para acessar a lista de WMS dispon�veis utilize o link <a href='ogc.htm' >ogc.htm</a>.Mais informa��es em <a href='www.opengeospatial.org' >OGC.</a>"
		},
		"13": {
			titulo: "Converter em KML",
			diretorio:"i3geo/ferramentas/convertekml",
			categoria:"2",
			pt:"Convertendo o mapa atual em KML � poss�vel utilizar outros softwares para visualizar o mesmo mapa visto no i3Geo. O resultado da convers�o � um endere�o (url) tempor�rio, esse endere�o deve ser inserido no software que se quer usar e que suporte KML. Para usar o KML no Google Earth, utilize a op��o desse softawre chamada 'adicionar link de rede'.",
			complemento:"KML � um padr�o internacional e n�o espec�fico do i3Geo. Conforme as caracter�sticas de cada servidor onde o i3Geo estiver instalado, o KML poder� permanecer dispon�vel por per�odos de tempo vari�veis. O KML gerado pelo i3Geo n�o cont�m as coordenadas dos elementos de uma camada, mas sim um WMS embutido no KML. Essa estrutura limita o uso do KML mas permite uma maior performance no acesso aos dados. Mais informa��es em <a href='www.opengeospatial.org' >OGC.</a>"
		},
		"14": {
			titulo: "Grade de pol�gonos",
			diretorio:"i3geo/ferramentas/gradepol",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo ret�ngulos com espa�amento determinado em x e y. A grade gerada pode ser obtida via download. O espa�amento � definido em d�cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.",
			complemento:"A grade � �til para a realiza��o de an�lises onde deseja-se calcular ocorr�ncias de fen�menos pontuais e represent�-los posteriormente com base em totais. Observe que a �rea e as dist�ncias reais de cada pol�gono n�o s�o constantes, uma vez que � utilizada a proje��o geogr�fica na sua gera��o."
		},
		"15": {
			titulo: "Grade de pontos",
			diretorio:"i3geo/ferramentas/gradepontos",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo pontos com espa�amento determinado em x e y. A grade gerada pode ser obtida via download. O espa�amento � definido em d�cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.",
			complemento:"Observe que as dist�ncias reais entre cada ponto n�o s�o constantes, uma vez que � utilizada a proje��o geogr�fica na sua gera��o."
		},
		"16": {
			titulo: "Grade de hex�gonos",
			diretorio:"i3geo/ferramentas/gradehex",
			categoria:"3",
			pt:"Cria uma nova camada no mapa contendo hex�gonos com espa�amento determinado em x e y. A grade gerada pode ser obtida via download. O espa�amento � definido em d�cimos de grau e as coordenadas do ponto inicial podem ser definida clicando-se no mapa ou digitando-se o valor.",
			complemento:"A grade � �til para a realiza��o de an�lises onde deseja-se calcular ocorr�ncias de fen�menos pontuais e represent�-los posteriormente com base em totais. Observe que a �rea e as dist�ncias reais de cada pol�gono n�o s�o constantes, uma vez que � utilizada a proje��o geogr�fica na sua gera��o."
		},
		"17": {
			titulo: "Dist�ncia entre pontos",
			diretorio:"i3geo/ferramentas/distanciaptpt",
			categoria:"3",
			pt:"O c�lculo de dist&acirc;ncias � feito de um ponto em rela&ccedil;&atilde;o aos mais pr&oacute;ximos. O ponto origem, deve estar selecionado em um dos temas existentes no mapa. Para restringir a dist�ncia de busca, � necess�rio definir um raio m�ximo, os pontos considerados ser�o aqueles dentro desse raio. Em cada linha ligando dois pontos s�o inseridos atributos que indicam a dist�ncia e o identificador dos pontos. Esses identificadores s�o escolhidos com base nas colunas de atributos do tema pontual escolhido.",
			complemento:"O resultado dos c�lculos s�o novas camadas inclu�das no mapa, sendo uma de linhas e uma com o entorno de busca considerado."
		},
		"18": {
			titulo: "",
			diretorio:"i3geo/ferramentas/pontoempoligono",
			categoria:"3",
			pt:"Ponto em pol&iacute;gono &eacute; uma opera&ccedil;&atilde;o que resulta em um novo tema contendo o cruzamento entre um tema com pontos e outros com pol&iacute;gonos (ou imagem raster). As informa&ccedil;&otilde;es do tema poligonal (ou raster) ser&atilde;o agregadas � tabela do novo tema pontual gerado. As colunas da tabela de atributos do novo tema gerado ser�o nomeadas em uma sequ�ncia num�rica, uma vez que o tema original pode ter colunas com nomes incompat�veis com o formato shapefile, utilizado na gera��o do novo tema.",
			complemento:"Pode-se escolher mais de um tema de origem dos dados, possibilitando agregar informa��es de temas diferentes. Essa op��o de cruzamento � �til nos casos onde a informa��o necess�ria para a an�lise de um tema encontra-se em outro tema. Por exemplo, � poss�vel cruzar um tema com a localiza��o das cidades com um tema com a delimita��o de biomas. O resultado permite elaborar estat�sticas por biomas com base nos dados dos pontos."
		},
		"19": {
			titulo: "N�mero de pontos por pol�gono",
			diretorio:"i3geo/ferramentas/nptpol",
			categoria:"3",
			pt:"Ponto em pol&iacute;gono &eacute; uma opera&ccedil;&atilde;o que resulta em um novo tema contendo o cruzamento entre um tema com pontos e outro com pol&iacute;gono. O resultado � um novo tema poligonal, cuja tabela de atributos conter� um item com o total de pontos em cada pol�gono",
			complemento:"O uso dessa ferramenta � indicado nas situa��es em que se deseja agregar dados de ocorr�ncias pontuais em pol�gonos, possibilitando a visualiza��o dos dados por meio de t�cnicas de classifica��o e representa��o coropl�tica."
		},
		"20": {
			titulo: "Distribui��o de pontos",
			diretorio:"i3geo/ferramentas/pontosdistri",
			categoria:"3",
			pt:"Essa op��o disponibiliza v�rias ferramentas de an�lise de distribui��o de pontos, a maior parte baseia-se no software estat�stico < href='www.r-project.org' >R</a>. Algumas das an�lises geram como resultado imagens RASTER e outras temas lineares e poligonais. A op��o de relat�rio gera uma nova p�gina com v�rios �ndices calculados com o software R.",
			complemento:"A imagem RASTER resultante utiliza a resolu��o (tamanho do pixel) compat�vel com a escala utilizada no mapa que est� sendo visto. A representa��o utiliza, por padr�o, tons de cinza. A altera��o nas cores utilizadas na representa��o podem melhorar de forma significativa a visualiza��o dos resultados. Utilize a op��o de edi��o da legenda do tema para fazer isso."
		},
		"21": {
			titulo: "Centr�ide",
			diretorio:"i3geo/ferramentas/centroide",
			categoria:"3",
			pt:"Os centr&oacute;ides s&atilde;o pontos localizados no centro de massa de uma geometria. Para gerar os centr&oacute;ides, voc&ecirc; precisa selecionar alguns elementos de um tema. Utilize para isso a op&ccedil;&atilde;o de sele&ccedil;&atilde;o ou a tabela de atributos do tema desejado.",
			complemento:"Dependendo da forma de uma geometria, o ponto calculado pode ser posicionado fora do pol�gono <a href='http://postgis.refractions.net/documentation/manual-svn/ST_Centroid.html' >exemplo</a>."
		},
		"22": {
			titulo: "Dissolver",
			diretorio:"i3geo/ferramentas/dissolve",
			categoria:"3",
			pt:"Essa ferramenta transforma v&aacute;rios pol&iacute;gonos em um s&oacute; eliminando as divisas entre eles. Para definir quais os pol&iacute;gonos devem ser unidos uns com os outros &eacute; preciso escolher um item da tabela de atributos do tema. Os pol&iacute;gonos que possu&iacute;rem o mesmo valor ser&atilde;o considerados no mesmo grupo e suas divisas eliminadas. Caso n&atilde;o tenha sido escolhido nenhum item, todas os pol&iacute;gonos ser&atilde;o agrupados em um s&oacute;.",
			complemento:"O resultado final ser&aacute; um novo tema com pol&iacute;gonos diferentes dos originais e cuja tabela de atributos conter&aacute; apenas o item escolhido. Caso as geometrias originais possuam fronteiras n�o ajustadas exatamente, o resultado pode apresentar pequenos pol�gonos internos."
		},
		"23": {
			titulo: "An�lise de geometrias",
			diretorio:"i3geo/ferramentas/analisegeometrias",
			categoria:"3",
			pt:"Essa ferramenta permite processar elementos constituintes de um ou mais temas por meio de fun��es que atuam sobre a geometria que define o elemento. Essas fun��es possibilitam a realiza��o de c�lculos, como �rea e per�metro, e cruzamentos entre geometrias, como uni�o e intersec��o. Para utilizar a ferramenta, deve-se selecionar cada elemento desejado e convert�-los em uma geometria ou conjunto de geometrias. Feito isso, as geometrias convertidas podem ser utilizadas nas opera��es.",
			complemento:"Para selecionar elementos, utilize as op��es de sele��o dispon�veis no i3Geo ou ent�o clique no mapa no elemento desejado ap�s ativar a ferramenta. A sele��o � feita sobre o tema escolhido. Para ver as geometrias capturadas, clique na guia 'listar'. Para usar as op��es de an�lise, mostradas na guia 'an�lise', voc� deve marcar as geometrias desejadas na guia 'listar'."
		},
		"24": {
			titulo: "Entorno (buffer)",
			diretorio:"i3geo/ferramentas/buffer",
			categoria:"3",
			pt:"O entorno, ou buffer, &eacute; um pol&iacute;gono que circunda um elemento geogr&aacute;fico em uma dist&acirc;ncia fixa. Para o c�lculo de dist�ncia o i3Geo utiliza a proje��o polic�nica. Os atributos do tema alvo s�o copiados para os pol�gonos resultantes e uma nova camada � adicionada ao mapa. Opcionalmente, os pol�gonos resultantes podem ser unidos como um �nico.",
			complemento:"Para gerar o entorno, voc&ecirc; precisa selecionar alguns elementos de um tema. Utilize para isso a op&ccedil;&atilde;o de sele&ccedil;&atilde;o ou a tabela de atributos do tema desejado."
		},
		"25": {
			titulo: "Agrupa elementos",
			diretorio:"i3geo/ferramentas/agrupaelementos",
			categoria:"3",
			pt:"Essa ferramenta transforma v&aacute;rios elementos selecionados de um tema em um s&oacute; criando pol&iacute;gonos agrupados. Para definir quais elementos devem ser unidos uns com os outros &eacute; preciso escolher um item da tabela de atributos do tema. Os elementos que possu&iacute;rem o mesmo valor nesse item ser&atilde;o considerados no mesmo grupo e suas divisas eliminadas. Caso n&atilde; tenha sido escolhido nenhum item, todas os elementos ser&atilde;o agrupados em um s&oacute;.",
			complemento:"O resultado final ser&aacute; um novo tema com pol&iacute;gonos diferentes dos originais e cuja tabela de atributos conter&aacute; apenas o item escolhido."
		},
		"26": {
			titulo: "Upload de arquivo dbf",
			diretorio:"i3geo/ferramentas/uploaddbf",
			categoria:"4",
			pt:"Utilize essa op&ccedil;&atilde;o para acrescentar um tema baseado nas coordenadas x e y presentes em uma tabela DBF. Os valores de x e y devem utilizar '.' como separador de decimal. Se as coordenadas estiverem na proje&ccedil;&atilde;o geogr&aacute;fica, os valores dever&atilde;o estar em d&eacute;cimos de grau, com sinal negativo para pontos ao sul do equador e oeste do meridiano 0.",
			complemento:"O arquivo DBF ser� armazenado no servidor onde o i3geo est� instalado e permanecer� l� at� que os arquivos tempor�rios sejam apagados. N�o utilize essa op��o se existir alguma restri��o ao uso do arquivo e se a pol�tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n�o for compat�vel com essas restri&ccedil;&otilde;es."
		},
		"27": {
			titulo: "Upload se shapefile",
			diretorio:"i3geo/ferramentas/",
			categoria:"4",
			pt:"Permite que um arquivo do tipo shapefile seja enviado ao servidor e inclu�do no mapa como uma nova camada. O arquivo shapefile ser� armazenado no servidor onde o i3geo est� instalado e permanecer� l� at� que os arquivos tempor�rios sejam apagados. Um shapefile � composto basicamente por tr�s tipos de arquivos (dbf, shp e shx), todos devem ser submetidos",
			complemento:"N�o utilize essa op��o se existir alguma restri��o ao uso do arquivo e se a pol�tica de acesso aos dados, definidas pela entidade que hospeda o i3geo, n�o for compat�velcom essas restri&ccedil;&otilde;es."
		},
		"28": {
			titulo: "Conex�o WMS",
			diretorio:"i3geo/ferramentas/conectarwms",
			categoria:"4",
			pt:"Uma conex�o WMS permite que dados dispon�veis em outros servidores sejam inclu�dos como camadas no i3Geo. Na ferramenta de conex�o � mostrada uma lista de endere�os previamente cadastrados, mas pode-se digitar um outro endere�o qualquer, desde que seja um servi�o no padr�o WMS. Ap�s um servi�o ser escolhido, a lista de camadas dispon�veis � mostrada na guia 'Temas'.",
			complemento:"Camadas obtidas por meio de conex�o WMS n�o permitem que algumas opera��es dispon�veis no i3Geo sejam executadas, como por exemplo a altera��o na legenda, sele��o, entre outras. Quando um servidor apresentar problemas, a camada n�o poder� ser adicionada."
		},
		"29": {
			titulo: "Conex�o GeoRSS",
			diretorio:"i3geo/ferramentas/conectargeorss",
			categoria:"4",
			pt:"Uma conex�o GeoRSS permite obter a localiza��o de conte�dos dispon�veis no formato RSS com coordenadas geogr�ficas inclu�das. Na ferramenta de conex�o � mostrada uma lista de endere�os previamente cadastrados, mas pode-se digitar um outro endere�o qualquer, desde que seja um servi�o no padr�o GeoRSS.",
			complemento:"A camada adicionada ao mapa baseia-se em um arquivo shapefile criado temporariamente pelo i3Geo. Caso o servi�o GeoRSS sofrer altera��es, como a inclus�o de um novo item, � necess�rio fazer novamente a conex�o para que a camada reflita a altera��o."
		},
		"30": {
			titulo: "Nuvem de tags",
			diretorio:"i3geo/ferramentas/nuvemtags",
			categoria:"4",
			pt:"A nuvem de tags � uma forma de localizar camadas dispon�veis para ser vistas no mapa. A busca � feita por meio de tags ou palavras-chave. As tags s�o registradas pelo administrador do i3Geo para cada tema dispon�vel na �rvore de temas.",
			complemento:"Ao escolher uma tag, � feita dos temas correspondentes e o resultado � adicionado � arvore de temas. Opcionalmente, o usu�rio pode escolher navegar na nuvem 'animada' que mostra as tags como um globo 3d."
		},
		"31": {
			titulo: "Procurar tema",
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"Localiza temas dispon�veis nos menus da �rvore de adi��o de temas. Os temas localizados s�o inclu�dos em um novo n� da �rvore, possibilitando sua adi��o ao mapa.",
			complemento:"Para procurar um tema, digite a palavra ou frase no campo de texto e clique no �cone existente no lado direito."
		},
		"32": {
			titulo: "Acesso aos arquivos do servidor",
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"Os usu�rios cadastrados no i3Geo como editores podem acessar arquivos existentes no servidor onde o i3Geo est� instalado. A navega��o permite localizar arquivos shapefile para inclus�o como uma nova camada no mapa.",
			complemento:"Por motivos de seguran�a, apenas os editores podem utilizar essa op��o. O cadastramento � feito pelo administrador do i3Geo, por meio da edi��o do arquivo ms_configura.php."
		},
		"33": {
			titulo: "�rvore de endere�os WMS",
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"A conex�o com servi�os WMS (OGC) pode ser feita escolhendo-se o servidor e as camadas dispon�veis diretamente na �rvore de temas. A lista de endere�os utilizada nesse n� da �rvore � a mesma utilizada na op��o de conex�o que � aberta por meio do �cone 'Conex�o MWS'. Quando uma camada for encontrada no WMS, � mostrado um 'box' ao lado do nome da camada, permitindo sua adi��o ao mapa.",
			complemento:"A vantagem do uso da �rvore � a velocidade de acesso � lista de camadas, uma vez que o i3Geo faz um 'cache' do arquivo XML gerado com a lista de camadas dispon�veis. A �rvore permite ainda a vis�o correta da hierarquia de camadas configuradas no WMS, que pode ter v�rios n�veis. Cada vez que um usu�rio tenta acessar um WMS o sucesso ou n�o da conex�o � registrado, assim, � poss�vel mostrar ao lado de cada endere�o o percentual de tentativas de conex�o v�lidas."
		},
		"34": {
			titulo: "Sistemas",
			diretorio:"classe_arvoredetemas.js",
			categoria:"4",
			pt:"O n� 'Sistemas' da �rvore de adi��o de temas, lista aplicativos especiais que precisam de intera��o com o usu�rio para a cria��o de uma camada.",
			complemento:"Alguns sistemas s�o fornecidos com a instala��o padr�o do i3Geo, mas cada administrador pode criar seus pr�prios."
		},
		"": {
			titulo: "",
			diretorio:"i3geo/ferramentas/",
			categoria:"4",
			pt:"",
			complemento:""
		}
	}
};
g_traducao_ajuda_categorias = {
	"1":{titulo:"Propriedades do mapa"},
	"2":{titulo:"Arquivos"},
	"3":{titulo:"An�lise geogr�fica"},
	"4":{titulo:"Inclus�o de camadas"}
};
//inserir os aplicativos adicionais
/*
<a class=ajuda_usuario target=_blank href='"+i3GEO.configura.locaplic+"/ajuda_usuario.php?idcategoria=4&idajuda=' >&nbsp;&nbsp;&nbsp;</a>
*/
/*
N�o esquecer:

Janela de mensagens
Gerador de links
Datadownload
Ativa/desativa entorno
Ativa/desativa logo


*/