from flask import Flask
from flask import request
from flask_cors import CORS
import os
import finalCode

api = Flask(__name__)
CORS(api)


@api.route('/profile', methods=['GET', 'POST'], strict_slashes=False)
def my_profile():

    predAns = "loading"

    if request.method == 'POST':
        dump = request.json['fileLonk']
        filep = "C:/Users/lenovo/Downloads/audioFileModel.wav"
        predAns = finalCode.make_pred(filep)
        if os.path.exists(filep):
            os.remove(filep)
        print(predAns)

    response_body = {
        "pred": predAns,
    }

    return response_body


if(__name__) == "__main__":
    api.run(debug=True)
