#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from urllib.parse import parse_qs, urlparse

#pass the list of files with get as a JSON array, i tried with post as HTML over HTTP but it gets blocked!
class ManifestHandler(http.server.SimpleHTTPRequestHandler):
 
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == "__main__":
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), ManifestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()
