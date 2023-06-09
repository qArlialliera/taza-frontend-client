import { StyleSheet } from "react-native";




export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 55,
    marginBottom: 10,
    backgroundColor: '#EFD3D7',
    width:'100%',
    borderColor: '#EFD3D7',
    borderRadius: 17,
    paddingHorizontal: 10,
  },
//   background:{
//     background: URL'
//   }
containerwellcome:{
    flex: 1,
    flexDirection: 'column',
},

contscrollView:{
  flex: 1,
  flexDirection: 'column',
  // backgroundColor: '#EFD3D7'
},

containerhead:{
    flexDirection:'row',
    margin:50,
},

  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    alignItems: 'center'
  },

  pink_button:{
    backgroundColor: '#EFD3D7',
    paddingVertical: 20,
    // paddingHorizontal: 85,
    width:'70%',
    alignItems: 'center',  
    marginBottom:30,
    borderRadius: 17,
    elevation: 3,
    top: '50%'
  },
  imagehome:{
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#8E9AAF'
  },
  imageback:{
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    backgroundColor: '#8E9AAF'
  },

  imageprofile:{
    flex: 1,
    width: '100%',
    backgroundColor: '#8E9AAF'
  },

  icons:{
    marginRight: 20,
    alignItems:'center'
  },


  roundButton1: {
    width: 230,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 230,
    backgroundColor: '#D9D9D9',
  },
  roundButton2: {
    width: 190,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 230,
    backgroundColor: '#D9D9D9',
  },

  containerButton: {
    position: 'absolute',
    bottom:-50,
    left: -70
  },

  containerButtonNext: {
    position: 'absolute',
    bottom:-50,
    right: -70
  },

  containerButtonBack: {
    position: 'absolute',
    bottom:-50,
    left: -70
  },
  container2:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  primary: {
    top: '15%',
    color: '#fff',
    fontFamily: 'Lobster-Regular',
    fontSize: 35
  },
  secondary: {
    color: '#8E9AAF', fontFamily: 'Nunito-Regular', textAlign: 'center', fontSize: 20
  },
  primary2: {
    marginBottom: 20,
    color: '#EFD3D7',
    fontFamily: 'Lobster-Regular',
    fontSize: 35,
    alignSelf: 'center'
},
  secondary2: {
    color: '#EFD3D7',
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center'
},
  container3:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width: '80%'
  },

  profile_info:{
    alignItems:'center',
    backgroundColor:'#D9D9D9',
    flexDirection:'row',
    width: '100%',
    borderRadius: 17,
    marginBottom: 20,
    paddingVertical: 15
    
  },
  profile_info_button:{
    alignItems:'center',
    backgroundColor:'#414C60',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20,
    borderColor: '#D9D9D9',
    borderWidth:4,
  },
  button_lightYellow:{
    alignItems:'center',
    backgroundColor:'#EDE5B9',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20
  },
  button_lightBlue:{
    alignItems:'center',
    backgroundColor:'#C2CFE4',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20
  },
  button_lightGreen:{
    alignItems:'center',
    backgroundColor:'#A6E7A5',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20
  },
  button_red:{
    alignItems:'center',
    backgroundColor:'#E4C2C2',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20
  },

  profile_info_button_secondary:{
    alignItems:'center',
    // backgroundColor:'#D9D9D9',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20,
    borderColor: '#EFD3D7',
    borderWidth:4,
  },
  searchbar:{
    backgroundColor: '#D9D9D9',
    margin: 50,
    borderRadius: 20,
    height: 50
  },
  searchbarWithBack:{
    backgroundColor: '#D9D9D9',
    marginHorizontal: 15,
    width: '80%',
    borderRadius: 20,
  },

  divspecial:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height: 200,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card_category:{
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: 170,
    height: 170,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20
    
  },
  dateTimeBtn:{
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 25
    
  },
  // datepic:{
  //   width: '100%',
  //   height: 260,
  //   backgroundColor: 'red'
  // },

  card_category_row:{
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    alignItems: 'center'
  },
  card_category_row_filter:{
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5, 
    width: 145,
    paddingVertical: 10, 
    borderRadius: 17, 
    marginHorizontal: 5, 
    alignItems: 'center'
  },
  card_category_row_filter_o:{
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5, 
    width: 145,
    paddingVertical: 10, 
    borderRadius: 17, 
    marginHorizontal: 5, 
    alignItems: 'center',
    opacity: 0.5
  },
  grid:{
    // flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-around'

  },
  button:{
    backgroundColor: '#D9D9D9',
    height: 60,
    alignItems: 'center',
    borderRadius: 20,
  },
  controw:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal: 20,
    // marginBottom: 50
  },
  buttoncompany:{
    backgroundColor: '#D9D9D9',
    height: 50,
    alignItems: 'center',
    borderRadius: 20,
    width: '45%',
    marginLeft: 10
  },
  cont_company:{
    flex:2,
    flexDirection:'row-reverse',
    marginHorizontal: 20,
    marginBottom:10
  },
  box_company:{
    backgroundColor: '#D9D9D9',
    height: 160,
    borderRadius: 20,
    // width:'80%',
    paddingHorizontal: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  image_company:{
    // top: '5%',
    left: -10,
    width:80,
    height: 80,
    borderRadius: 10
  },
  back:{
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    padding: 20,
    backgroundColor: '#8E9AAF'
  },
  circleimg:{
    width: 100,
    height: 100,
    borderRadius: 100
  },
  primary:{
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    color: '#fff',
    marginTop: 10
  },
  tabtextstyle: {
    fontFamily: 'Lobster-Regular',
    color: '#fff',
    fontSize: 17
  },
  activeTabStyle:{
    backgroundColor: '#EFD3D7',
    // color: '#EFD3D7'
  },
  activeTabTextStyle:{
    color: '#414C60'
  },
  tabStyle: {
    backgroundColor: '#545E70',
    borderColor: '#545E70',
    height: 40
  },
  name:{
    fontFamily: 'Nunito-SemiBold',
    color: 'black',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  card_category_services: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: 30,
    // paddingHorizontal: 70,
    alignItems: 'flex-start',
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-around'  
  },

  card_category_services_disabled: {
    backgroundColor: '#9C9C9C',
    borderRadius: 20,
    paddingVertical: 30,
    // paddingHorizontal: 70,
    alignItems: 'flex-start',
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-around'  
  },
  price:{
    fontFamily: 'Nunito-Regular',
    fontWeight: '300',
    color: 'black',
    // marginRight: 30,
    // alignItems: 'flex-end'
  },
  company_contsct_btn: {
    alignItems:'center',
    backgroundColor:'#414C60',
    width: '48%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20,
    borderColor: '#D9D9D9',
    borderWidth:4,
    justifyContent:'center'
  },
  company_contsct_btn_secondary:{
    alignItems:'center',
    backgroundColor:'#414C60',
    width: '100%',
    borderRadius: 17,
    padding: 15,
    marginBottom: 20,
    borderColor: '#8E9AAF',
    borderWidth:4,
  },
  msg_img:{
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 30
    // top: 30
  },

  msgBox:{
    flexDirection: 'column',
    backgroundColor: '#D9D9D9', 
    borderRadius: 17, 
    paddingVertical: 10,
    minHeight: 50,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5
  },
  msgBox2:{
    flexDirection: 'column',
    backgroundColor: '#D9D9D9', 
    borderRadius: 17, 
    paddingVertical: 10,
    minHeight: 50,
    width: '70%',
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  msgBoxRed:{
    flexDirection: 'column',
    backgroundColor: '#EFD3D7', 
    borderRadius: 17, 
    paddingVertical: 10,
    // minHeight: 50,
    // width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5
  },

  btn_Red:{
    backgroundColor: '#E4C2C2', 
    borderRadius: 17, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '50%',
    alignSelf: 'flex-end'
  },
  btn_RedNew:{
    backgroundColor: '#E4C2C2', 
    borderRadius: 17, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '50%',
    alignSelf: 'center'
  },
  book_bodytext:{
    fontFamily: 'Lobster-Regular', 
    fontSize: 22, 
    color: '#fff', 
    textTransform: 'capitalize',
    marginTop: 20,
  },
  num_input:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    width: 130,
    height: 60,
    padding: 20,
    position: 'absolute',
    left: '50%'
  },
  extra_feature_box:{
    marginTop: 5,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 17,
    marginHorizontal: 5
  },
  inputText:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height: 100,
    marginVertical: 10,
    alignItems: 'flex-start',
    padding:20,
    // width: '80%'

  },
  inputText2:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height: 100,
    marginVertical: 10,
    alignItems: 'flex-start',
    padding:20,
    width: '80%'

  },
  inputTextWithBorder:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height: 100,
    marginVertical: 10,
    alignItems: 'flex-start',
    paddingHorizontal:20,
    borderColor: '#414C60',
    borderWidth: 2
  },

  secondary_button: {
    
    color: '#D9D9D9',
    fontFamily: 'Nunito-Black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  container_messages: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 24,
    color: '#999',
    alignSelf: 'center',
  },
  image_card_m:{
    alignSelf: 'center',
    marginHorizontal: 7,
    width: 60,
    height: 60,
    borderRadius: 100
  },
  containerScroll:{
    minHeight: '200%'
  },
  btn_position:{
    position: 'absolute',
    bottom: 20,
    // right: 20,
  },
  image_avater:{
    width: 120,
    height: 120,
    borderRadius:100,
    borderWidth: 5,
    borderColor: '#8E9AAF',
  },
  inputTextSpecial:{
    backgroundColor: '#8E9AAF',
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    height: 303,
    marginTop: 30,
    color: '#676767',
    textAlignVertical: 'top',
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
    padding: 20,
    fontSize: 20
  },
  redDeleteBtn : {
    backgroundColor: '#EFD3D7', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#414C60', 
    position: 'absolute', 
    left: '80%', 
    padding: 10,
    alignItems: 'center',
    top: '70%'
  },
  lastOrderYellow:{
    backgroundColor: '#EDE5B9', 
    borderRadius: 20, 
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 10
  },
  lastOrderBlue:{
    backgroundColor: '#C2CFE4', 
    borderRadius: 20, 
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 10
  }
});