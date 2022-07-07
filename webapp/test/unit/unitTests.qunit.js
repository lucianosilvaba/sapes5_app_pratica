/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"brcompratica/sapes5_app_pratica/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
