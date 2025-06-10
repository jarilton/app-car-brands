import Reactotron from "reactotron-react-native";

Reactotron.configure({ name: "appCarBrands" }) // Insira o nome do seu projeto aqui
  .useReactNative() // Adiciona suporte ao React Native
  .connect(); // Conecta-se ao aplicativo Reactotron

console.tron = Reactotron; // Facilita o acesso ao Reactotron em todo o aplicativo
