import keras
import numpy as np
import librosa


class livePredictions:
    """
    Main class of the application.
    """
    f = "temp"

    def __init__(self, path):
        """
        Init method is used to initialize the main parameters.
        """
        self.path = path

    def load_model(self):
        """
        Method to load the chosen model.
        :param path: path to your h5 model.
        :return: summary of the model with the .summary() function.
        """
        self.loaded_model = keras.models.load_model(self.path)
        # return self.loaded_model.summary()

    def makepredictions(self):
        """
        Method to process the files and create your features.
        """
        data, sampling_rate = librosa.load(self.f)
        mfccs = np.mean(librosa.feature.mfcc(
            y=data, sr=sampling_rate, n_mfcc=40).T, axis=0)
        x = np.expand_dims(mfccs, axis=1)
        x = np.expand_dims(x, axis=0)
        predict_x = self.loaded_model.predict(x)
        predictions = np.argmax(predict_x, axis=1)
#         predictions = self.loaded_model.predict_classes(x)
        return self.convertclasstoemotion(predictions)

    @staticmethod
    def convertclasstoemotion(pred):
        """
        Method to convert the predictions (int) into human readable strings.
        """

        label_conversion = {'0': 'neutral',
                            '1': 'calm',
                            '2': 'happy',
                            '3': 'sad',
                            '4': 'angry',
                            '5': 'fearful',
                            '6': 'disgust',
                            '7': 'surprised'}

        for key, value in label_conversion.items():
            if int(key) == pred:
                label = value
        return label

# Here you can replace path and file with the path of your model and of the file
# from the RAVDESS dataset you want to use for the prediction,
# Below, I have used a neutral file: the prediction made is neutral.


def make_pred(filename='test.wav'):
    pred.f = filename
    return pred.makepredictions()


pred = livePredictions(path='testing10_model.h5')
pred.load_model()

# triggered = True
# if(triggered):
final_ans = make_pred()
# print(final_ans)
# return object = {
#     "pred": final_ans,
#     "filename": filename
# }
