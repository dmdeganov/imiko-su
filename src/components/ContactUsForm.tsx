'use client';
import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import TextField from '@/shared-ui/TextField';
import ContainedButton from '@/shared-ui/ContainedButton';
import {useSendEmail} from '@/hooks/useSendEmail';
import useModal from '@/hooks/useModal';
import EmailSentModal from '@/components/EmailSentModal';

export interface FormInputs {
  name: string;
  email: string;
  position: string;
}

const ContactUsForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors, touchedFields},
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      position: '',
    },
  });

  const {isOpen, open, close, modalData, setModalData} = useModal<{success: boolean}>();

  const onSuccess = () => {
    setModalData({success: true});
    reset();
    open();
  };

  const onError = () => {
    setModalData({success: false});
    open();
  };
  const {sendEmail, loading} = useSendEmail({onError, onSuccess});

  const onSubmit: SubmitHandler<FormInputs> = async data => sendEmail(data);

  const getInputValidationProps = (inputName: keyof FormInputs) => ({
    error: !!errors[inputName]?.message,
    helperText: errors[inputName]?.message,
    isValid: !errors[inputName] && touchedFields[inputName],
  });

  return (
    <>
      <form className="contact-form" onSubmit={e => e.preventDefault()}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 2,
              message: 'Поле должно содержать не менее двух символов',
            },
          }}
          render={({field}) => (
            <TextField {...field} label="Имя" ref={null} placeholder="Ваше имя" {...getInputValidationProps('name')} />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный формат email',
            },
          }}
          render={({field}) => (
            <TextField
              {...field}
              label="Почта"
              ref={null}
              type="email"
              placeholder="example@mail.com"
              {...getInputValidationProps('email')}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 3,
              message: 'Поле должно содержать не менне трех символов',
            },
          }}
          render={({field}) => (
            <TextField
              {...field}
              label="Ваш запрос"
              ref={null}
              multiline
              placeholder="Ваше сообщение"
              {...getInputValidationProps('position')}
            />
          )}
        />
        <ContainedButton
          type="submit"
          // onClick={handleSubmit(onSubmit)}
          onClick={open}
          className="contact-form__submit-button"
          // disabled={!isValid}
          loading={loading}
        >
          Отправить
        </ContainedButton>
      </form>
      <EmailSentModal isOpen={isOpen} close={close} success={modalData?.success as boolean} />
    </>
  );
};

export default ContactUsForm;
