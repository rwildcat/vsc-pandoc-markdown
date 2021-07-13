import * as vscode from 'vscode';
import PandocMDPreviewPanel from './preview_panel';

let extensionContext: vscode.ExtensionContext;
let panel: PandocMDPreviewPanel | undefined;

function openPandocMd() {
	let activeEditor = vscode.window.activeTextEditor;

	if (!activeEditor) {return;}
	if (panel) {panel.dispose();}
	panel = new PandocMDPreviewPanel(activeEditor, extensionContext);
}

function exportHTML() {
	if (!panel) {
		openPandocMd();
	}
	panel.exportHTML();
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	extensionContext = context;

	// Main command, defined in package.json
	let cmdOpenPandocMd = vscode.commands.registerCommand('extension.pandoc-markdown.openPreview', openPandocMd);
	context.subscriptions.push(cmdOpenPandocMd);

	let cmdExportHTML = vscode.commands.registerCommand('extension.pandoc-markdown.exportHTML', exportHTML);
	context.subscriptions.push(cmdExportHTML);
}

// this method is called when your extension is deactivated
export function deactivate() {
if (panel) {
	panel.dispose();}
}
