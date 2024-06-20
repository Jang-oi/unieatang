import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
export default function SignIn() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80dvh',
        width: '100%',
        px: 2,
      }}
    >
      <Box
        component="main"
        sx={{
          my: 'auto',
          py: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 400,
          maxWidth: '100%',
          mx: 'auto',
          borderRadius: 'sm',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
          [`& .MuiFormLabel-asterisk`]: {
            visibility: 'hidden',
          },
        }}
      >
        <Stack>
          <Stack gap={1}>
            <Typography component="h1" level="h3">
              로그인
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={4} sx={{ mt: 2 }}>
          <form
            onSubmit={(event: React.FormEvent<SignInFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                email: formElements.email.value,
                password: formElements.password.value,
                persistent: formElements.persistent.checked,
              };
              alert(JSON.stringify(data, null, 2));
            }}
          >
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl required>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Stack gap={4} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label="Remember me" name="persistent" />
                <Link level="title-sm">Forgot your password?</Link>
              </Box>
              <Button type="submit" fullWidth>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
