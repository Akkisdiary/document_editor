"""App entry point."""
from document_editor import create_app

app = create_app()

if __name__ == "__main__":
    from livereload import Server
    app.config['DEBUG'] = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    server = Server(app.wsgi_app)
    server.serve(port=5000)
