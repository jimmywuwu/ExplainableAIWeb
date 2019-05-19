from flask import Flask, flash, request, redirect, url_for,send_from_directory,render_template,jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import pickle
import json
import shap
import sys
import pandas as pd

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER=os.path.dirname(os.path.abspath(__file__))+"/uploads"
ALLOWED_EXTENSIONS = set(['pkl'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
Model_information=dict()
print(os.listdir(os.path.dirname(os.path.abspath(__file__))+"/uploads"))
models=os.listdir(os.path.dirname(os.path.abspath(__file__))+"/uploads")
print(models)

@app.route("/")
def hello():
    print(os.path.abspath(__file__))
    return render_template("index1.html",models=models[1:])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload_model', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route('/model_list')
def model_list():
    return str(os.listdir(UPLOAD_FOLDER))+"\n"

@app.route('/load_model/<modelname>')
def load_model(modelname):
    try:
        with open(UPLOAD_FOLDER+'/'+modelname,'rb') as f:
            Model=pickle.load(f)
            Model_information['register_model']=modelname
            Model_information['is_register']=1
            Model_information['feature_name']=Model.feature_names
        return "Model is succesfully loaded\n"
    except:
        return "Fail to load model."

@app.route('/model_information')
def model_information():
    if Model_information['is_register']==1:
        return json.dumps(Model_information)

# implement 回傳index.html (要render model_file name , 選定model後再同頁面回傳FeatureName及Input)
@app.route('/get_model_feature')
def model_feature():
    model_name=request.args.get('model_name')
    with open(UPLOAD_FOLDER+'/'+model_name,'rb') as f:
            Model=pickle.load(f)
    explainer = shap.TreeExplainer(Model)
    print("explainer installed")
    return jsonify(Model.feature_names)

@app.route('/model_predict')
def model_shap_value():
    # model_name=request.args.get('model_name')
    model_name="xgboost_model.pkl"
    x='{"CRIM":0.00632,"ZN":18.0,"INDUS":2.31,"CHAS":0.0,"NOX":0.538,"RM":6.575,"AGE":65.2,"DIS":4.09,"RAD":1.0,"TAX":296.0,"PTRATIO":15.3,"B":396.9,"LSTAT":4.98}'
    # x=request.args.get('x')
    x=json.loads(x)
    with open(UPLOAD_FOLDER+'/'+model_name,'rb') as f:
            model=pickle.load(f)
    explainer = shap.TreeExplainer(model)
    
    print("\n\n\n\n\n")
    print(x)
    print("\n\n\n\n\n")
    res=explainer.shap_values(pd.DataFrame.from_dict(x,orient="index").T )
    data={
        "baseValue": json.loads(str(explainer.expected_value)),
        "link":"identity",
        "featureNames" : {str(i):model.feature_names[i] for i in range(len(model.feature_names))},
        "outNames" : ["output value"],
        "features": {str(i): { "value": x[model.feature_names[i]] ,"effect": json.loads(str(res[0][i])) } for i in range(len(model.feature_names))}
    }
    # print(data)
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8001)