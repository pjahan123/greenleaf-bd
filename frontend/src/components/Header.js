import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable as RNPressable,
  StyleSheet
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {C} from '../styles/theme';
const Pressable=({style,...props})=><RNPressable {...props} style={(state)=>{const base=typeof style==='function'?style(state):style;return [base,state.pressed&&{opacity:0.82,transform:[{scale:0.97}]}]}}/>;

export default function Header({search,setSearch,cartCount,onMenu,onCart,onWishlist,onSearch}){
 return <>
  <View style={s.top}><Text style={s.topText}>🌿 Fresh plants • Safe delivery • 7-day replacement</Text></View>
  <View style={s.head}>
   <Pressable style={s.iconBtn} onPress={onMenu}><Ionicons name="menu-outline" size={25} color={C.deep}/></Pressable>
   <View style={s.brand}><View style={s.logo}><Ionicons name="leaf" size={18} color="#fff"/></View><View><Text style={s.brandText}>GREENLEAF</Text><Text style={s.brandSub}>BD • PLANTS & LIVING</Text></View></View>
   <View style={s.icons}>
    <Pressable style={s.iconBtn} onPress={onWishlist}><Ionicons name="heart-outline" size={22} color={C.deep}/></Pressable>
    <Pressable style={s.iconBtn} onPress={onCart}><Ionicons name="bag-handle-outline" size={22} color={C.deep}/><View style={s.badge}><Text style={s.badgeText}>{cartCount}</Text></View></Pressable>
   </View>
  </View>
  <View style={s.search}><Ionicons name="search-outline" size={20} color={C.muted}/><TextInput value={search} onChangeText={setSearch} onSubmitEditing={onSearch} placeholder="Search plants, seeds & planters" placeholderTextColor="#8A958D" style={s.input}/>{search?<Pressable onPress={()=>setSearch('')}><Ionicons name="close-circle" size={19} color={C.muted}/></Pressable>:null}</View>
 </>
}
const s=StyleSheet.create({
 top:{height:30,backgroundColor:C.deep,alignItems:'center',justifyContent:'center'},topText:{fontSize:10,fontWeight:'700',color:'#F5FAF4'},
 head:{height:70,backgroundColor:C.paper,flexDirection:'row',alignItems:'center',paddingHorizontal:16,borderBottomWidth:1,borderColor:C.line},iconBtn:{width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'},brand:{flex:1,flexDirection:'row',alignItems:'center',marginLeft:4},logo:{width:38,height:38,borderRadius:12,backgroundColor:C.green,alignItems:'center',justifyContent:'center'},brandText:{fontSize:17,fontWeight:'900',letterSpacing:2,color:C.deep,marginLeft:9},brandSub:{fontSize:8,fontWeight:'700',letterSpacing:1.1,color:C.muted,marginLeft:9,marginTop:2},icons:{flexDirection:'row',gap:2},badge:{position:'absolute',right:0,top:1,minWidth:17,height:17,paddingHorizontal:4,borderRadius:9,backgroundColor:C.gold,alignItems:'center',justifyContent:'center'},badgeText:{fontSize:9,fontWeight:'900',color:'#fff'},search:{height:50,marginHorizontal:16,marginTop:10,marginBottom:8,borderRadius:16,borderWidth:1,borderColor:C.line,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',paddingHorizontal:14,gap:9},input:{flex:1,fontSize:15,color:C.ink}}
);