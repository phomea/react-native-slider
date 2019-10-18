/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
 
  Colors,
 
} from 'react-native/Libraries/NewAppScreen';
import CustomSlider from './src/CustomSlider';
 
class App extends React.Component {
  state={
    value :0,
    seek:0
  }
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text>Custom slider examples</Text>
            <Text>onChangeValue : {this.state.value}</Text>
            <Text>onSeek : {this.state.seek}</Text>
            
            <CustomSlider onChangeValue={(v)=>{
              this.setState({
                value : v
              })
            }}
            
            onSeek={(v)=>{
              this.setState({
                seek : v
              })
            }}/>


            <CustomSlider steps={[
              {
                value : 33
              },
              {
                value : 66
              }
            ]} onChangeValue={(v)=>{
              this.setState({
                value : v
              })
            }}
            />

            
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    padding: 20
  },
  
});

export default App;
