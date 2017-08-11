import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Linking,
  TextInput,
  ScrollView,
 TouchableOpacity
} from 'react-native';
import DisplayHTML from 'react-native-display-html';
import HTMLView from 'react-native-htmlview';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		url:''
  	}
  }
  static navigationOptions = {    
  };
  render() {  	
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
       <Text style={styles.togStyle}>
          Enter tog
        </Text>
        <TextInput style = {styles.input}
           value={this.state.url}
           onChangeText={(value) => this.setState({url: value})}
           underlineColorAndroid = "transparent"
           autoCapitalize = "none"
        />
        <TouchableOpacity  onPress={() => navigate('Chat',{url: this.state.url })}
           style = {styles.submitButton}>
           <Text style = {styles.submitButtonText}>
                  Submit
           </Text>
        </TouchableOpacity>    
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Back',
  }; 
  render() { 
  	const { navigate } = this.props.navigation;
	const { params } = this.props.navigation.state;
	    return (
      <View style={styles.container}>
        <WebView 
            source = {{ uri: params.url }}
           style={{marginTop: 20, marginBottom:75, marginLeft:10, marginRight:10}}
         />
          <TouchableOpacity  onPress={() => navigate('Html',{url: params.url})}
            style = {styles.submitButton}>
            <Text style = {styles.submitButtonText}>
                Debug
             </Text>
            </TouchableOpacity>
      </View>
    )
  }
}

class HtmlScreen extends React.Component {
 constructor(props) {
 	super(props);
 	this.state = {
 		HtmlPage:''
 	}
 }
  static navigationOptions = {
    title: 'Back',
  };
  componentWillMount() {
  const { params } = this.props.navigation.state;
    	var request = new XMLHttpRequest();
	    request.onreadystatechange = (e) => {
 		 if (request.readyState !== 4) {
  	  		return;
  		}
		 if (request.status === 200) {		 	
		 	 this.setState({HtmlPage: request.responseText});		   
		  } else {
		    console.warn('error');
		  }
		};        
		request.open('GET', params.url);
		request.send();
  }
  render() { 
	const { params } = this.props.navigation.state;  

	    return (
      <View style={styles.container}>
       <ScrollView>
        <Text>
         {this.state.HtmlPage}
         </Text>
          </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },

  togStyle: {
 marginTop: 50,
 marginLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  
  },
   input: {
      margin: 15,
      height: 80,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
    submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,   
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white',
      textAlign: 'center'
   },  
  webview: {
   margin: 15,
      height: 160,
      borderColor: '#7a42f4',
      borderWidth: 1
  },
});

const test = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Html: {screen: HtmlScreen}
});

AppRegistry.registerComponent('test', () => test);