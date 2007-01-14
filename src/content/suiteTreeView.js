/*
 * Copyright 2005 Shinya Kasatani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function SuiteTreeView(editor, tree) {
	this.log = new Log("SuiteTreeView");
	this.editor = editor;
    this.rowCount = 0;
    this.tree = tree;
	tree.view = this;
    var self = this;
    tree.addEventListener("dblclick", function(event) {
            var testCase = self.getSelectedTestCase();
            if (testCase) {
                editor.loadTestCase(testCase.getFile());
            }
        }, false);
}

SuiteTreeView.prototype = {
    getSelectedTestCase: function() {
        return this.getTestSuite().tests[this.tree.currentIndex];
    },

    getTestSuite: function() {
        return this.editor.testSuite;
    },

	refresh: function() {
		this.log.debug("refresh: old rowCount=" + this.rowCount);
		this.treebox.rowCountChanged(0, -this.rowCount);
        this.treebox.rowCountChanged(0, this.getTestSuite().tests.length);
		this.rowCount = length;
	},

	//
	// nsITreeView interfaces
	//
    getCellText : function(row, column){
		var colId = column.id != null ? column.id : column;
        return this.getTestSuite().tests[row].title;
    },
    setTree: function(treebox) {
		this.treebox = treebox;
	},
    isContainer: function(row) {
		return false;
	},
    isSeparator: function(row) {
		return false;
	},
    isSorted: function(row) {
		return false;
	},
    getLevel: function(row) {
		return 0;
	},
    getImageSrc: function(row,col) {
		return null;
	},
    getRowProperties: function(row, props) {
	},
    getCellProperties: function(row, col, props) {
	},
    getColumnProperties: function(colid, col, props) {},
	cycleHeader: function(colID, elt) {}
};
