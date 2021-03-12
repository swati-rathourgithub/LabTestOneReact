import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Touchable } from 'react-native';


export default function App() {
	const [inputText, setInputText] = useState("");
	const [countries, setCountries] = useState([]);
	const [display, setDisplay] = useState(false);
	const [isDisabled, setDisabled] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [numCountries, setNumCountries] = useState(5);
	const addHandler = () => {
		setCountries((allCountries) => {
			let c = [{id: makeid(5), name: inputText},...allCountries];
			c.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1:-1);
			return c;
		});
		setInputText("");
		if(countries.length>=numCountries-1)
		{
			setDisplay(true);
			setDisabled(true);
		}
		console.log(countries.length);
	};
	
	const addSelectedItem = (item) => {
		setSelectedItems((allItems) => {
			return [item,...allItems];
		})
	};
	
	const deSelectItem = (item) => {
		setSelectedItems((allItems) => {
			return allItems.filter((items) => items.id != item.id);
		});
	};
	
	const displayFlatList = () =>{
		if(display)
		{
			return (
				<FlatList style={styles.flatList} data={countries}
				renderItem={({item}) => (
					<ListItem item={item} addSelectedItem={addSelectedItem} deSelectItem={deSelectItem}/>
					)}
					keyExtractor={(item) => item.id}
					extraData={countries.length}/>
					);
				}
			};
			
			const deleteHandler = () =>{
				setCountries(countries.filter(val => !selectedItems.includes(val)));
				setDisabled(countries.length>=numCountries-1);
			};

			const increaseLimit = () => {
				setNumCountries(numCountries+1);
				setDisabled(countries.length>=numCountries-1);
				setDisplay(countries.length>=numCountries-1);
			};

			const decreaseLimit = () => {
				if(numCountries>0)
				{
					setNumCountries(numCountries-1);
					setDisabled(countries.length>=numCountries-1);
					setDisplay(countries.length>=numCountries-1);
					console.log(countries.length,numCountries);
				}
			};
			const displayHandler = () =>{
				let str = "";
				countries.forEach((country) => {
					str += country.name + "\n";
				});
				alert(str);
			};
			const clearHandler = () =>{
				setSelectedItems([]);
				setCountries([]);
				setDisabled(false);
				setNumCountries(4);
				setDisplay(false);
				setInputText("");
			};
			return (
				<View style={styles.container}>
				<TextInput placeholder="Country name" value={inputText} onChangeText={(text) => setInputText(text)}/>
				<View style={styles.btnView}>
					<TouchableOpacity disabled={isDisabled} onPress={addHandler}><Text>Add</Text></TouchableOpacity>
					<TouchableOpacity onPress={deleteHandler}><Text>Delete</Text></TouchableOpacity>
					<TouchableOpacity onPress={displayHandler}><Text>Display</Text></TouchableOpacity>
					<TouchableOpacity onPress={clearHandler}><Text>Clear</Text></TouchableOpacity>
				</View>
				<View style={styles.btnView}>
					<Text>Accepting {numCountries} countries</Text>
					<TouchableOpacity onPress={increaseLimit}><Text>Increase</Text></TouchableOpacity>
					<TouchableOpacity onPress={decreaseLimit}><Text>Decrease</Text></TouchableOpacity>
				</View>
				{displayFlatList()}
				</View>
				);
			}
			
			const styles = StyleSheet.create({
				container: {
					flex: 1,
					backgroundColor: '#fff',
					paddingTop:20,
				}, flatList:{
					flex:1,
				},
				btnView:{
					flexDirection:"row",
					justifyContent:"space-around",
				}
			});
			
			export function ListItem({item, addSelectedItem, deSelectItem})
			{
				const [isSelected, setSelected] = useState(false);
				const [backgroundColor, setBackgroundColor] = useState("#fff");
				const clickHandler = () => {
					if(isSelected)
					{
						deSelectItem(item);
						setBackgroundColor("#fff");
						setSelected(false);
					}
					else
					{
						addSelectedItem(item);
						setBackgroundColor("#eee");
						setSelected(true);
					}
				};
				return (<TouchableOpacity style={{backgroundColor:backgroundColor}} onPress={clickHandler}><Text>{item.name}</Text></TouchableOpacity>);
			}
			
			function makeid(length) {
				var result           = '';
				var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				var charactersLength = characters.length;
				for ( var i = 0; i < length; i++ ) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				return result;
			}