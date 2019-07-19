import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
  fcamera: {
    width: winWidth,
    height: winHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  wvideo: {
    left: winWidth*.55,
    position:'absolute',
  },
  wvideoBig: {
    width: winWidth * 0.9,
    position: 'absolute',
    height: winHeight * 0.5,
    top: winHeight * 0.45,
    bottom: 0,
  },
  wvscroll: {
    width: winWidth,
    height: winHeight * 0.05,
    marginTop: winHeight * .3,
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  swapIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  tcontainer: {
    top: 45,
    left: 55,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pcontaineer: {
    top: 60,
    left: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  linkText: {
    color: 'blue',
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: '100%',
    height: '100%'
  },
  bottomToolbar: {
    zIndex: 9,
    width: winWidth,
    position: 'absolute',
    height: 100,
    top: winHeight * 0.85,
    bottom: 10,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "black",

  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    borderColor: "transparent",
    backgroundColor: "red",
  },
  mainContainerHalfCamRow:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white",
 },
 leftSqHalfCamRow:{
     flex:1,
     aspectRatio:9/16,
     backgroundColor:"blue",
 },
 rightSqHalfCamRow:{
     flex:1,
     aspectRatio: 9/16,
     backgroundColor:"green"
 },
}

);
