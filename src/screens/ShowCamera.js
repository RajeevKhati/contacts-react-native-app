import { View, Text, Pressable } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateClickedPhotoUri } from "../redux/actions/clickedPhotoUriActions";
import { MaterialIcons } from "@expo/vector-icons";

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
    dispatch(updateClickedPhotoUri(photo.uri));
  };

  const _takePicture = () => {
    if (cam.current) {
      const options = {
        quality: 0.5,
        skipProcessing: false,
        onPictureSaved: afterPictureSaved,
      };
      cam.current.takePictureAsync(options);
    }
  };

  return (
    <Camera ref={cam} style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => _takePicture()}>
          <MaterialIcons name="camera" size={50} color="#ffffff99" />
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
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
