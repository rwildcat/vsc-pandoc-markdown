import * as vscode from 'vscode';
import * as path from 'path';
import {exec, ChildProcess, ExecOptions} from 'child_process';


/* implements vscode.Disposable */
export default class PandocMDPreviewPanel {
	active: boolean;								// false if the panel has been closed
	editor: vscode.TextEditor;					// the text editor this panel previews the contents of
	panel: vscode.WebviewPanel;				// the panel that the preview is shown in
	cssFix: string | undefined;				// the vscode-resource:/ uri of media/fixDefault.css
	cssArticle: string | undefined;			// the vscode-resource:/ uri of media/article.css
	subprocess: ChildProcess | undefined;	// the pandoc subprocess if it is running, undefined if not running
	lastRenderedTime: number;					// the time that the last invocation of pandoc exited
	pending: boolean;								// whether there is an active setTimeout() call to render()
	disposables: vscode.Disposable[];		// self explanatory
	cmdPandoc: string = '';			// pandoc final command line
	cmdExecOptions: ExecOptions = {};		// pandoc final cmdExecOptions

	constructor(editor: vscode.TextEditor, extensionContext: vscode.ExtensionContext) {

		this.active = true;
		this.editor = editor;
		let localResourceRoots = [];
		
		localResourceRoots.push(vscode.Uri.file(extensionContext.extensionPath));

		if (vscode.workspace.workspaceFolders) {
			vscode.workspace.workspaceFolders.forEach(f => localResourceRoots.push(f.uri));
		}

		if (editor.document.uri.scheme === 'file') {
			let baseDir = vscode.Uri.file(path.dirname(editor.document.uri.fsPath));
			localResourceRoots.push(baseDir);
		}

		this.panel = vscode.window.createWebviewPanel(
			'pandoc-md',
			'Pandoc Markdown',
			vscode.ViewColumn.Beside,
			{enableScripts: true, localResourceRoots}
		);
		
		this.cssFix = extensionContext.asAbsolutePath('media/fixDefault.css');		
		this.cssArticle = extensionContext.asAbsolutePath('media/article.css');

		this.lastRenderedTime = 0;
		this.pending = false;
		this.disposables = [];

		vscode.workspace.onDidChangeTextDocument(ev => {
			if (ev.document === this.editor.document) {
				setTimeout(() => { this.render(); }, 50);
			}
		}, null, this.disposables);

		vscode.workspace.onDidCloseTextDocument(doc => {
			if (doc === this.editor.document && doc.isClosed) {
				this.dispose();}
		}, null, this.disposables);

		this.panel.onDidDispose(() => {
			this.dispose();
		}, null, this.disposables);

		this.render();
	}

	
	render() {
		if (!this.active) { return; }
		if (this.pending) { return; }

		let config = vscode.workspace.getConfiguration('pandocMd');

		if (Date.now() < this.lastRenderedTime + config.minimumWaitInterval || this.subprocess) {
			// can't render now, try later
			this.pending = true;
			setTimeout(() => {
				this.pending = false;
				this.render();
			}, 50);
			return;
		}

		let pandocOptions = [];
		let execOptions: ExecOptions = {};
		let fname= "";

		execOptions.timeout = 5000;

		let baseTagUri: vscode.Uri | undefined;
		if (this.editor.document.uri.scheme === 'file') {
			baseTagUri = this.panel.webview.asWebviewUri(this.editor.document.uri);
			execOptions.cwd = path.dirname(this.editor.document.uri.fsPath);
			fname = path.parse(this.editor.document.uri.fsPath).name;
		}

		pandocOptions.push('-s');
		pandocOptions.push(`-H ${this.cssFix}`);

		if (config.ArticleStyle) {
			pandocOptions.push(`-H ${this.cssArticle}`);
		}

		if (config.extraPandocArguments.length !== 0) {
			pandocOptions.push(config.extraPandocArguments);
		}
		
		let cmdPandoc = `pandoc ${pandocOptions.join(' ')}`;

		this.cmdPandoc = cmdPandoc + ` -o "${fname}.html"`;
		this.cmdExecOptions = execOptions;

		this.subprocess = exec(cmdPandoc, execOptions, (err, stdout, stderr) => {
			this.subprocess = undefined;
			if (!this.active) { return; }
			this.lastRenderedTime = Date.now();
			if (err) {
				this.panel.webview.html = `
					<p>Error executing pandoc:</p>
					<pre>${escapeHtml(String(err))}</pre>
				`;
			} else {				
				stdout = stdout.replace('</head>', `<base href="${baseTagUri}"> </head>`);
				this.panel.webview.html = stdout; 				
			}
		});
		
		// get current editor contents and send it to pandoc as stdin
		// when invoqued w/o input file, pandoc wats for stdin input

		// @ts-ignore: Object is possibly 'null'.
		this.subprocess.stdin.write(this.editor.document.getText());

		// @ts-ignore: Object is possibly 'null'.
		this.subprocess.stdin.end();
	}


	exportHTML() {
		this.subprocess = exec(this.cmdPandoc, this.cmdExecOptions, (err, stdout, stderr) => {
			this.subprocess = undefined;
			if (!this.active) { return; }
			this.lastRenderedTime = Date.now();
			if (err) {
				this.panel.webview.html = `
					<p>Error executing pandoc:</p>
					<pre>${escapeHtml(String(err))}</pre>
				`;
			}
		});
		
		// get current editor contents and send it to pandoc as stdin
		// when invoqued w/o input file, pandoc wats for stdin input

		// @ts-ignore: Object is possibly 'null'.
		this.subprocess.stdin.write(this.editor.document.getText());

		// @ts-ignore: Object is possibly 'null'.
		this.subprocess.stdin.end();
	}


	dispose() {
		if (!this.active) {return;}
		this.active = false;
		this.panel.dispose();
		this.disposables.forEach(x => x.dispose());
	}


}

// stack overflow
function escapeHtml(unsafe: string) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}