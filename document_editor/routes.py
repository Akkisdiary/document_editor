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

    if form.validate_on_submit():
        now = datetime.now()

        if form.id.data:
            file_meta = UserFiles.query.get(form.id.data)
            file_meta.modified = now
            file_meta.file_name = form.file_name.data
        else:
            file_meta = UserFiles(created=now,
                                  modified=now,
                                  file_name=form.file_name.data,
                                  user_id=current_user.get_id(),
                                  file_content=form.file_content.data)
            db.session.add(file_meta)
        db.session.commit()
        return redirect(url_for('main_bp.documents'))

    if file_id:
        user_file = UserFiles.query.get(file_id)
        form = SaveFileForm(id=user_file.id,
                            file_name=user_file.file_name,
                            file_content=user_file.file_content)

    return render_template("editor.html", form=form, title='Editor')


@main_bp.route('/documents', methods=['GET'])
@login_required
def documents():
    files_meta = UserFiles.query.filter_by(user_id=current_user.get_id()).all()
    return render_template("documents.html", files=files_meta, title='Documents')


@main_bp.route('/delete_file', methods=['POST'])
@login_required
def delete_file():
    try:
        file = UserFiles.query.get(request.form.get('id'))
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
