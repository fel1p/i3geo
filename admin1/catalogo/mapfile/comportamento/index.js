/*
Licenca:

GPL2

i3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist&eacute;rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@gmail.com

Este programa &eacute; software livre; voc&ecirc; pode redistribu&iacute;-lo
e/ou modific&aacute;-lo sob os termos da Licen&ccedil;a P&uacute;blica Geral
GNU conforme publicada pela Free Software Foundation;

Este programa &eacute; distribu&iacute;do na expectativa de que seja &uacute;til,
por&eacute;m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl&iacute;cita
de COMERCIABILIDADE OU ADEQUA&Ccedil;&Atilde;O A UMA FINALIDADE ESPEC&Iacute;FICA.
Consulte a Licen&ccedil;a P&uacute;blica Geral do GNU para mais detalhes.
Voc&ecirc; deve ter recebido uma c&oacute;pia da Licen&ccedil;a P&uacute;blica Geral do
GNU junto com este programa; se n&atilde;o, escreva para a
Free Software Foundation, Inc., no endere&ccedil;o
59 Temple Stredisponibilidadeet, Suite 330, Boston, MA 02111-1307 USA.

 */
i3GEOadmin.mapfile = {};
i3GEOadmin.comportamento = {
		inicia: function(codigo, id_tema){
			i3GEOadmin.core.modalAguarde(true);
			$.post(
					"exec.php?funcao=lista",
					"codigo="+codigo
			)
			.done(
					function(data, status){
						i3GEOadmin.core.modalAguarde(false);
						var json = jQuery.parseJSON(data);
						$("#corpo").html(
								Mustache.to_html(
										$("#templateFormComportamento").html(),
										$.extend(
												{},
												i3GEOadmin.comportamento.dicionario,
												json.dados,
												{
													"codigo": codigo,
													"id_tema": id_tema,
													"onSalvar": "i3GEOadmin.comportamento.salvar",
													"aplicaextensao": function(){
														var hash = {
																"sim": i3GEOadmin.comportamento.dicionario.sim,
																"nao": i3GEOadmin.comportamento.dicionario.nao,
																"NAO-sel" : "",
																"SIM-sel": ""
															};
														hash[json.dados.aplicaextensao + "-sel"] = "selected";
														return Mustache.to_html(
																$("#templateOpcoesPublicado").html(),
																hash
														);
													},
													"permitecomentario": function(){
														var hash = {
																"sim": i3GEOadmin.comportamento.dicionario.sim,
																"nao": i3GEOadmin.comportamento.dicionario.nao,
																"NAO-sel" : "",
																"SIM-sel": ""
															};
														hash[json.dados.permitecomentario + "-sel"] = "selected";
														return Mustache.to_html(
																$("#templateOpcoesPublicado").html(),
																hash
														);
													},
													"escondido": function(){
														var hash = {
																"sim": i3GEOadmin.comportamento.dicionario.sim,
																"nao": i3GEOadmin.comportamento.dicionario.nao,
																"NAO-sel" : "",
																"SIM-sel": ""
															};
														hash[json.dados.escondido + "-sel"] = "selected";
														return Mustache.to_html(
																$("#templateOpcoesPublicado").html(),
																hash
														);
													},
													"transitioneffect": function(){
														var hash = {
																"sim": i3GEOadmin.comportamento.dicionario.sim,
																"nao": i3GEOadmin.comportamento.dicionario.nao,
																"NAO-sel" : "",
																"SIM-sel": ""
															};
														hash[json.dados.transitioneffect + "-sel"] = "selected";
														return Mustache.to_html(
																$("#templateOpcoesPublicado").html(),
																hash
														);
													},
													"status": function(){
														var hash = {
																"sim": i3GEOadmin.comportamento.dicionario.sim,
																"nao": i3GEOadmin.comportamento.dicionario.nao,
																"NAO-sel" : "",
																"SIM-sel": ""
															};
														hash[json.dados.status + "-sel"] = "selected";
														return Mustache.to_html(
																$("#templateMsStatus").html(),
																hash
														);
													}
												}
										)
								)
						);
						$.material.init();
					}
			)
			.fail(
					function(data){
						i3GEOadmin.core.modalAguarde(false);
						i3GEOadmin.core.mostraErro(data.status + " " +data.statusText);
					}
			);
		},
		salvar: function(codigo,id_tema){
			var parametros = $("#form-edicao-comportamento").serialize();
			i3GEOadmin.core.modalAguarde(true);
			$.post(
					"exec.php?funcao=alterar",
					"codigo=" + codigo + "&id_tema="+ id_tema+"&"+parametros
			)
			.done(
					function(data, status){
						i3GEOadmin.comportamento.inicia(codigo,id_tema);
					}
			)
			.fail(
					function(data){
						i3GEOadmin.core.modalAguarde(false);
						i3GEOadmin.core.mostraErro(data.status + " " +data.statusText);
					}
			);
		}
};