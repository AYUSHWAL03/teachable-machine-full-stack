from flask import Blueprint,Flask,request,make_response
import os
from flask_cors import CORS
from sklearn.neural_network import MLPClassifier,MLPRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
global fullpath,df,tdf,y_data
modelTrain = Blueprint('modelTrain', __name__)

@modelTrain.route('/mlp-classification/train', methods=['GET'])
def mlpClassification():
    try:
        print('Running activity classification')
        X = df.drop(y_data,axis=1)
        Y = df[y_data]

        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
        Input_layer = X_train.shape[1] - 1
        Output_layer = 1
        calc_of_hidden_layer = int((2/3)*Input_layer + Output_layer)
        print("Input_layer", Input_layer, "Output_layer", Output_layer,"hidden_layer",calc_of_hidden_layer)
        if(calc_of_hidden_layer>=128):
            first_layer = 128
            second_layer = calc_of_hidden_layer - 128
            mlp = MLPClassifier(hidden_layer_sizes=(first_layer, second_layer),max_iter=50, random_state=42,verbose=True)
        else: 
            first_layer = calc_of_hidden_layer 
            mlp = MLPClassifier(hidden_layer_sizes=(first_layer),max_iter=50, random_state=42,verbose=True)
        mlp.fit(X_train, y_train)
        y_pred = mlp.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Accuracy: {accuracy:.2f}")
        return {"response":{"Accuracy": accuracy,"Input_Layers":Input_layer,"Output_Layers":Output_layer,"hidden_layer":calc_of_hidden_layer}}
    except ValueError as e:
        print("Error : ",e)
        return {"response":"Error Data prvoieded is not proper please use our cleaning steps"}
    except NameError as e:
        print("Error : ",e)
        return {"response":"Error Provide data to the machine first...."}
@modelTrain.route('/mlp-regression/train', methods=['GET'])
def mlpRegression():
    try:
        print('Running activity classification')
        X = df.drop(y_data,axis=1)
        Y = df[y_data]

        X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
        Input_layer = X_train.shape[1] - 1
        Output_layer = 1
        calc_of_hidden_layer = int((2/3)*Input_layer + Output_layer)
        print("Input_layer", Input_layer, "Output_layer", Output_layer,"hidden_layer",calc_of_hidden_layer)
        if(calc_of_hidden_layer>=128):
            first_layer = 128
            second_layer = calc_of_hidden_layer - 128
            mlp = MLPClassifier(hidden_layer_sizes=(first_layer, second_layer),max_iter=50, random_state=42,verbose=True)
        else: 
            first_layer = calc_of_hidden_layer 
            mlp = MLPRegressor(hidden_layer_sizes=(first_layer),max_iter=50, random_state=42,verbose=True)
        mlp.fit(X_train, y_train)
        y_pred = mlp.predict(X_test)
        accuracy = mean_squared_error(y_test,y_pred)/100000
        print(f"Accuracy: {accuracy:.2f}")
        return {"response":{"Accuracy": accuracy,"Input_Layers":Input_layer,"Output_Layers":Output_layer,"hidden_layer":calc_of_hidden_layer}}
    except ValueError as e:
        print("Error : ",e)
        return {"response":"Error Data prvoieded is not proper please use our cleaning steps"}
    except NameError as e:
        print("Error : ",e)
        return {"response":"Error Provide data to the machine first...."}

@modelTrain.route('/getTargetColumn',methods=['POST'])
def getTargetColumn():
    global y_data
    TargetCols = request.form.get("TargetCols").strip()
    print(df[TargetCols])
    if TargetCols in df.columns:
        y_data = TargetCols
        return {"TargetCols": TargetCols}
    else:
        return {"Response": "Not found in your data"}

@modelTrain.route('/get-cols-data',methods=['GET'])
def get_cols_data():
    try:
        return {"response":df.columns.tolist()}
    except NameError as e:
        print("Error : ",e)
        return {"response":"Error Upload the file first to our machine..."}
    
@modelTrain.route('/upload-data', methods=['POST'])
def upload_data():
    global fullpath,df,tdf
    file = request.files['modelTrainfile']
    filename = file.filename
    filepath = os.path.join('userInput\\modelTrainInp',filename)
    file.save(filepath)
    fullpath = "C:\\Users\\walekara\\Desktop\\Python Tut\\"+filepath
    df = pd.read_csv(fullpath)
    tdf = df 
    return {"Response": 'File uploaded successfully',"filepath" : fullpath}