import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  //WebViewController? _controller;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('CorpoChat'),
        ),
        body: WebView(
          initialUrl: 'https://corpo-chat.netlify.app',
          javascriptMode: JavascriptMode.unrestricted,
          zoomEnabled: false,
          
          //onWebViewCreated: (WebViewController webviewController) {
          //  _controller = webviewController;
          //  _controller?.clearCache();
          //},
          //onPageFinished: (String url) {
          //_controller!.evaluateJavascript('document.body.style.cache = "no-cache"');
          //},
        ),
      ),
    );
  }
}
