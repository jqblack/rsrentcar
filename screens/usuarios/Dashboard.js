import React, {useContext} from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import Appcontext from '../../context/AppContext'
export default function Dashboard({ navigation }) {
  const {user} = useContext(Appcontext);

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>console.log(user)
          
        }
      >
        Logout
      </Button>
    </Background>
  )
}
