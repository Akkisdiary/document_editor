from flask import (Blueprint, render_template, redirect, url_for,
                   request, abort, jsonify, current_app, make_response, send_file)
from flask_login import current_user, login_required
from flask_login import logout_user
from .models import db, UserFiles
from .forms import SaveFileForm

import os
import re
from datetime import datetime


main_bp = Blueprint(
    'main_bp', __name__,
    template_folder='templates',
    static_folder='static'
)


@main_bp.route('/editor', methods=['GET', 'POST'])
@main_bp.route('/editor/<int:file_id>', methods=['GET', 'POST'])
@login_required
def editor(file_id=None):
    form = SaveFileForm()
    data = None

    if form.validate_on_submit():
        now = datetime.now()

        if form.id.data and form.file_content.data:
            file_meta = UserFiles.query.get(form.id.data)
            file_meta.modified = now
            file_meta.file_name = form.file_name.data
        else:
            file_meta = UserFiles(created=now,
                                  modified=now,
                                  file_name=form.file_name.data,
                                  user_id=current_user.get_id())
            db.session.add(file_meta)

        path = f"{current_app.config['USER_FILES']}/{current_user.get_id()}/{file_meta.created.strftime('%f')}.txt"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(form.file_content.data.strip())

        db.session.commit()
        return redirect(url_for('main_bp.documents'))

    if file_id:
        user_file = UserFiles.query.get(file_id)
        with open(f"./writing_artist/user_files/{current_user.get_id()}/{user_file.created.strftime('%f')}.txt", 'r') as file:
            data = file.read()
        form = SaveFileForm(id=user_file.id, file_name=user_file.file_name)

    return render_template("editor.html", form=form, content=data)


@main_bp.route('/', methods=['GET'])
@login_required
def documents():
    files_meta = UserFiles.query.filter_by(user_id=current_user.get_id()).all()
    files = list()
    clean = re.compile('<.*?>')
    for f in files_meta:
        try:
            content = ''
            with open(f"./writing_artist/user_files/{current_user.get_id()}/{f.created.strftime('%f')}.txt", 'r') as file:
                data = re.sub(clean, '', file.read())
                content = data[:100]
            files.append((f, content))
        except:
            print('File not found -->', f.file_name)
            db.session.delete(f)
            db.session.commit()
    return render_template("documents.html", files=files)


@main_bp.route('/download_file/<int:idx>', methods=['GET'])
@login_required
def download_file(idx):
    file = UserFiles.query.get(idx)

    if file:
        doc = html_to_doc(current_user.get_id(), file)
        print(doc)
        return send_file(doc, as_attachment=True, attachment_filename=f'{file.file_name}.docx')
    return abort(404)


@main_bp.route('/delete_file', methods=['POST'])
@login_required
def delete_file():
    try:
        file = UserFiles.query.get(request.form.get('id'))
        path = f"{current_app.config['USER_FILES']}/{current_user.get_id()}/{file.created.strftime('%f')}.txt"

        os.remove(path)
        db.session.delete(file)
        db.session.commit()
        return jsonify('True')
    except:
        return jsonify('False')


@ main_bp.route("/logout")
@ login_required
def logout():
    logout_user()
    return redirect(url_for('auth_bp.login'))


@ main_bp.errorhandler(404)
def not_found(e):
    return make_response(render_template("error.html"), 404)
