import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderMeta,
  ProviderName,
  ProviderInfo,
  ProviderMetaText,
  ProviderListText,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProvider] = useState([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  const navigationToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProvider(response.data);
    });
  }, []);

  const navigationToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('createAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigationToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProviderList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<ProviderListText>Cabeleireiros</ProviderListText>}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigationToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: user.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
