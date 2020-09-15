import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import ImagePicker from 'react-native-image-picker';

import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordlInputRef = useRef<TextInput>(null);
  const passwordlInputRef = useRef<TextInput>(null);
  const confirmPasswordlInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handlerSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };
        const response = await api.put('/profile', formData);

        updateUser(response.data);

        navigation.goBack();

        Alert.alert('Peefil atualizado com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualziação do pefil',
          'Ocorreu um erro ao ao atualziar seu perfil, tente novamente.',
        );
      }
    },
    [navigation],
  );

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert(
            'Ocorreu um erro',
            'Houve um erro ao tentar atualizar seu avatar, tente novamente',
          );
        }

        const data = new FormData();

        data.append('avatar', {
          type: response.type,
          name: `${user.id}-${response.fileName}.jpg`,
          uri: response.uri,
        });

        api
          .patch('users/avatar', data)
          .then((apiResponse) => {
            updateUser(apiResponse.data);
          })
          .catch((error) => console.log(error));
      },
    );
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoback}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form initialData={user} onSubmit={handlerSignUp} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordlInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordlInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordlInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordlInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordlInputRef.current?.focus();
                }}
              />

              <Input
                ref={confirmPasswordlInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar Mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
