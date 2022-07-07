sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("br.com.pratica.sapes5apppratica.controller.DetalheOrdensVendas", {
            onInit: function () {


                //Criar objeto Route e acoplando a função que fará o bindElement
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("DetalheOrdensVendas").attachMatched(this.onBindingOrdemDetalhes, this);



            },
            onBindingOrdemDetalhes: function (oEvent) {

                // debugger;
                //Capturando o parametro trafegado no Route Detalhes (SalesOrderID)
                var oOrdVenda = oEvent.getParameter("arguments").SalesOrderID;

                this.onSearchItem(oOrdVenda);

                //Objeto referente a view Detalhes
                var oView = this.getView();

                //Criar a url de chamada da nossa entidade de produtos

                var sURL = "/SalesOrderSet('" + oOrdVenda + "')";


                //Realizar o bindElement

                oView.bindElement({
                    path: sURL,
                    parameters: { expand: 'ToBusinessPartner' },
                    events: {
                        change: this.onBindingChange.bind(this),
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function (data) {
                            //debugger;
                            oView.setBusy(false);
                        }
                    }
                });
            }, 

            onBindingChange: function (oEvent) {

                //debugger;
                var oView = this.getView();
                var oElementBinding = oView.getElementBinding();

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                // Se não existe um registro válido eu farei uma ação
                if (!oElementBinding.getBoundContext()) {


                    oRouter.getTargets().display("objNotFound");
                    return;

                }
            },

            onSearchItem: function (value) {

                debugger;

                var oFilter = new Filter({
                    filters: [
                        new Filter("SalesOrderID", FilterOperator.Contains, value),
                    ],
                    and: true
                })

                // Criação do Objeto List
                var oTable = this.getView().byId("tableItemOrdemVendas");

                //Acesso a agregação items, que é a entidade onde srá aplicada o filtro
                var binding = oTable.getBinding("items");

                // É aplicado o filtro para o databinding
                binding.filter(oFilter);
            },

            listarFornecedor: function (evt) {

                // debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaFornecedor");

            },

            listarProduto: function (evt) {

                //debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaProdutos");

            },

            date: function (value) {

                //debugger;

                var oConfiguration = sap.ui.getCore().getConfiguration();

                var oLocale = oConfiguration.getFormatLocale();

                var oPattern = "";

                if (oLocale === "pt-BR") {

                    oPattern = "dd/MM/yyyy"

                } else {
                    oPattern = "MM/dd/yyyy"
                }

                if (value) {
                    var year = new Date().getFullYear();
                    if (year === 9999) {
                        return "";
                    } else {
                        var oDateFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                            // style: "full"

                            pattern: oPattern
                        });

                        return oDateFormat.format(new Date(value));
                    }
                } else {
                    return value;
                }

            },

            onNavBack: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaOrdensVendas");
                
            },           

  
            onDetalheFornecedor: function (value) {

               // var oFornId = evt.getSource().getBindingContext().getProperty("ToBusinessPartner/BusinessPartnerID");
                var oFornIdLink = this.getView().byId("linkHeaderForn");
                var oFornId     = oFornIdLink.mProperties.text;
                var oRouter     = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DetalheFornecedor", {
                    BusinessPartnerID: oFornId
                });                
            }
        });
    });
