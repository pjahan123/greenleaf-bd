
import {StyleSheet, Platform} from 'react-native';

export const UI = {
  colors:{
    forest:'#24513A', green:'#2F6B45', sage:'#E8F0E7', cream:'#FBF8F1',
    white:'#FFFFFF', ink:'#17231C', muted:'#66736A', line:'#E3E9E2',
    gold:'#D69A3A', danger:'#C64D45', soft:'#F3F6F1'
  },
  radius:{sm:10, md:14, lg:20, xl:28, pill:999},
  shadow:Platform.select({
    ios:{shadowColor:'#173323',shadowOpacity:.10,shadowRadius:14,shadowOffset:{width:0,height:6}},
    android:{elevation:4},
    default:{}
  })
};

export const UX = StyleSheet.create({
  screen:{flex:1,backgroundColor:UI.colors.cream},
  content:{paddingHorizontal:18,paddingTop:12,paddingBottom:110},
  h1:{fontSize:30,lineHeight:36,fontWeight:'900',color:UI.colors.ink},
  h2:{fontSize:22,lineHeight:28,fontWeight:'900',color:UI.colors.ink},
  body:{fontSize:16,lineHeight:24,color:UI.colors.muted},
  label:{fontSize:15,lineHeight:20,fontWeight:'800',color:UI.colors.ink},
  chip:{minHeight:42,paddingHorizontal:16,borderRadius:UI.radius.pill,alignItems:'center',justifyContent:'center'},
  card:{backgroundColor:UI.colors.white,borderRadius:UI.radius.lg,...UI.shadow},
  primary:{minHeight:52,borderRadius:UI.radius.md,backgroundColor:UI.colors.forest,alignItems:'center',justifyContent:'center',paddingHorizontal:18},
  secondary:{minHeight:48,borderRadius:UI.radius.md,backgroundColor:UI.colors.sage,alignItems:'center',justifyContent:'center',paddingHorizontal:18}
});
