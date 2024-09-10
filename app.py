from flask import Flask,request,make_response
import os
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder,MinMaxScaler,StandardScaler
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
import category_encoders as ce
from apis.modelTrain import modelTrain


app = Flask(__name__)
CORS(app)
global fullpath,df,tdf
app.register_blueprint(modelTrain,url_prefix="/modelTrain")
######################## CLASS METHODS #################################
class MultiColumnLabelEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.label_encoders = {}
        self.columns_to_encode = []

    def fit(self, X, y=None):
        self.columns_to_encode = X.select_dtypes(include=['object']).columns.tolist()
        for col in self.columns_to_encode:
            self.label_encoders[col] = LabelEncoder().fit(X[col])
        return self

    def transform(self, X):
        X_encoded = X.copy()
        for col in self.columns_to_encode:
            X_encoded[col] = self.label_encoders[col].transform(X[col])
        return X_encoded



######################## DECORATORS ####################################
def get_categorical_cols(categorical_columns):
    for col in categorical_columns:
        isColumnNumeric = False
        for i, value in enumerate(df[col]):
            if isinstance(value, str) and value.isnumeric():
                isColumnNumeric = True
            if isinstance(value, str) and value.replace(",", "").isnumeric():
                df.at[i, col] = int(value.replace(",", ""))
                isColumnNumeric = True
        if isColumnNumeric:
            df[col] = pd.to_numeric(df[col], errors='coerce')

def onehot_encoding_transformer(obj_columns):
    def onehot_tranform(*args, **kwargs):
        try:
            global tdf,df
            obj = obj_columns(*args, **kwargs)
            # if(len(obj) == 0):
            #     return {"response": "Error No need to transform"}
            onehot_encoding_transformer = ColumnTransformer(transformers=[('onehot', OneHotEncoder(), obj)],remainder='passthrough')
            tdf = onehot_encoding_transformer.fit_transform(df)
            print(type(tdf))
            tdf = pd.DataFrame(tdf)
            #remaining columns are missing from the transformed that we need to add for now developing other transformer pipelines 
            for col in df.columns:
                if col not in obj:
                    tdf[col] = df[col]
            df =tdf                
            tdf.to_csv('output\\transform.csv',header=True, index=False)
            return { "response" : tdf.head().to_html()}
        except NameError as e:
            print("Error : ",e)
            return {"response": "Error" + " Give Data input first"}
    return onehot_tranform

def label_encoding_transformer(obj_columns):
    def label_transform(*args, **kwargs):
        try:
            global tdf, df
            obj = obj_columns(*args, **kwargs)
            if(len(obj) == 0):
                return {"response": "Error No need to transform"}
            print("Columns to label encode:", obj)
            label_encoding_transformer = ColumnTransformer(transformers=[('label', MultiColumnLabelEncoder(), obj)], remainder='passthrough')
            pipeline = Pipeline(steps=[('label_encoding', label_encoding_transformer)])
            print(type(obj))
            for col in df.columns:
                if col not in obj:
                    obj.append(col)
            print(obj)
            tdf = pd.DataFrame(pipeline.fit_transform(df), columns=obj)
            df = tdf.copy()
            tdf.to_csv('output\\transform.csv', index=False)
            return { "response" : tdf.head().to_html()}
        except NameError as e:
            print("Error : ",e)
            return {"response": "Error" + " Give Data input first"}
    return label_transform

def binary_encoding_transformer(obj_columns):
    def binary_transform(*args,**kwargs):
        try:
            global tdf,df
            obj = obj_columns(*args, **kwargs)
            if(len(obj) == 0):
                return {"response": "Error No need to transform"}
            binary_encoder = ce.BinaryEncoder(cols = obj,return_df=True)
            tdf = binary_encoder.fit_transform(df)
            df =tdf 
            tdf.to_csv('output\\transform.csv',header=True, index=False)
            return { "response" : tdf.head().to_html()}
        except NameError as e:
            print("Error : ",e)
            return {"response": "Error" + " Give Data input first"}    
    return binary_transform

def mostfreq_imputer_transformer(null_columns):
    def mostfreq_transform(*args,**kwargs):
        try:
            global tdf,df
            null_col = null_columns(*args, **kwargs)
            imputer_most_frequent_transformer = ColumnTransformer(transformers=[
                ('most_frequent_imputer', SimpleImputer(strategy='most_frequent', missing_values=np.nan), null_col)
            ],remainder='passthrough')
            tdf = pd.DataFrame(imputer_most_frequent_transformer.fit_transform(df), columns=df.columns)
            df =tdf 
            tdf.to_csv('output\\transform.csv',header=True, index=False)
            return tdf.head().to_html()
        except ValueError:
            return {"response":"Error Data is not numerical yet, convert it to numerical first using encoders"}
        except NameError as e:
            print("Error : ",e)
            return {"response":"Error Upload the file first to our machine..."}
    return mostfreq_transform

def mean_imputer_transformer(null_columns):
    def mean_transform(*args,**kwargs):
        try:
            global tdf,df
            null_col = null_columns(*args, **kwargs)
            imputer_mean_transformer = ColumnTransformer(transformers=[
                ('mean_imputer', SimpleImputer(strategy='mean', missing_values=np.nan), null_col)
            ],remainder='passthrough')
            tdf = pd.DataFrame(imputer_mean_transformer.fit_transform(df), columns=df.columns)
            df =tdf 
            tdf.to_csv('output\\transform.csv',header=True, index=False)
            return {"response": tdf.head().to_html()}
        except ValueError:
            return {"response":"Error Data is not numerical yet, convert it to numerical first using encoders"}
        except NameError as e:
            print("Error : ",e)
            return {"response":"Error Upload the file first to our machine..."}
    return mean_transform

def median_imputer_transformer(null_columns):
    def median_transform(*args,**kwargs):
        try:
            global tdf,df
            null_col = null_columns(*args, **kwargs)
            imputer_median_transformer = ColumnTransformer(transformers=[
                ('median_imputer', SimpleImputer(strategy='median', missing_values=np.nan), null_col)
            ],remainder='passthrough')
            tdf = pd.DataFrame(imputer_median_transformer.fit_transform(df), columns=df.columns)
            df =tdf 
            tdf.to_csv('output\\transform.csv',header=True, index=False)
            return {"response":tdf.head().to_html()}
        except ValueError:
            return {"Response":"Error Data is not numerical yet, convert it to numerical first using encoders"}
        except NameError as e:
            print("Error : ",e)
            return {"response":"Error Upload the file first to our machine..."}
    return median_transform


############################# ROUTES #############################
@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Teachable machine!",201

@app.route('/insight-data', methods=['GET'])
def insight_data():
    try:
        return {"response":df.head().to_html()},200
    except NameError as e:
        print("Error",e)
        return {"response":"Error Upload the file first to our machine..."},200

@app.route('/describe-data',methods=['GET'])
def describe():
    try:
        categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
        get_categorical_cols(categorical_columns)
        information = df.describe()
        return {"response":information.to_html()},200
    except :
        return {"response":"Error Upload the file first to our machine..."},200

@app.route('/info-data',methods=['GET'])
def Df_info():
    try:
        categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
        get_categorical_cols(categorical_columns)
        information = df.info()
        response = make_response(information)
        response.status_code = 200
        return response
    except :
        return {"Response":"Upload the file first to our machine..."},404

@app.route('/null-data',methods=['GET'])
def null_data():
    try:
        null_data = df.isnull().sum()
        return {"response":null_data.to_json()}
    except :
        return {"response":"Error Upload the file first to our machine..."},200

@app.route('/input-data',methods=['GET'])
def preprocess():
    data = request.form
    return {"null_values_handler":data['null_values_handler'],"categorical_handler":data['categorical_handler']}

@app.route('/transform-onehot-data',methods=['GET'])
@onehot_encoding_transformer
def transform_onehot():
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    get_categorical_cols(categorical_columns)
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    return categorical_columns

@app.route('/transform-binary-data',methods=['GET'])
@binary_encoding_transformer
def transform_onehot():
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    get_categorical_cols(categorical_columns)
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    return categorical_columns

@app.route('/transform-label-data',methods=['GET'])
@label_encoding_transformer
def transform_onehot():
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    get_categorical_cols(categorical_columns)
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()
    return categorical_columns

@app.route('/remove-null-data',methods=['GET'])
def dropnull_data():
    try:
        global tdf,df
        tdf = df.dropna()
        df = tdf
        return {"response":tdf.head().to_html()}
    except UnboundLocalError as e:
        print("Error ",e)
        return {"response":"Error Upload the file first to our machine..."}
    except NameError as e:
        print("Error ",e)
        return {"response":"Error Upload the file first to our machine..."}

@app.route('/impute-mostfreq-data',methods=['GET'])
@mostfreq_imputer_transformer
def impute_mostfreq_data():
    global tdf
    null_value_col = [col for col in df.columns if df[col].isnull().sum() > 0]
    return null_value_col

@app.route('/impute-mean-data',methods=['GET'])
@mean_imputer_transformer
def impute_mean_data():
    global tdf
    null_value_col = [col for col in df.columns if df[col].isnull().sum() > 0]
    return null_value_col

@app.route('/impute-median-data',methods=['GET'])
@median_imputer_transformer
def impute_median_data():
    global tdf
    null_value_col = [col for col in df.columns if df[col].isnull().sum() > 0]
    return null_value_col

@app.route('/get-cols-data',methods=['GET'])
def get_cols_data():
    try:
        return {"response":df.columns.tolist()}
    except NameError as e:
        print("Error : ",e)
        return {"response":"Error Upload the file first to our machine..."}
@app.route('/upload-data',methods=['POST'])
def preprocessing_func():
    global fullpath,df,tdf
    file = request.files['csvfile']
    filename = file.filename
    filepath = os.path.join('userInput\\preprocessFile',filename)
    file.save(filepath)
    fullpath = "C:\\Users\\walekara\\OneDrive - CDK Global LLC\\Desktop\\Python Tut\\"+filepath
    df = pd.read_csv(fullpath)
    tdf = df 
    return {"Response": 'File uploaded successfully !!!! ',"filepath" : fullpath}

if __name__ == '__main__':
    app.run(debug=True)