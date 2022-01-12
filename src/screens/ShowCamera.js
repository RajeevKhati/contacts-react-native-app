import { View, Text } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateBase64Image } from "../redux/actions/base64ImageActions";

const ShowCamera = (props) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const cam = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const afterPictureSaved = (photo) => {
    props.navigation.goBack();
    dispatch(updateBase64Image(photo.base64));
  };

  const _takePicture = () => {
    if (cam.current) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: false,
        onPictureSaved: afterPictureSaved,
      };
      cam.current.takePictureAsync(options);
      // const photo = await cam.current.takePictureAsync(options);
      // console.log(cam.current.getSupportedRatiosAsync());
      // const source = photo.uri;
      // if (source) {
      //   cam.current.resumePreview();
      //   // console.log("picture source Base64", photo.base64); //store this in db
      //   props.navigation.goBack();
      //   DeviceEventEmitter.emit("event.clickedPhoto", { photo: photo });
      // }
    }
  };

  return (
    <Camera ref={cam} style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => _takePicture()}>
          <Text style={styles.text}> Camera </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default ShowCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
