import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  Link,
} from '@builder.io/qwik-city';
import { auth } from '~/lib/lucia';

export const useUserLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (user) {
    throw event.redirect(303, '/');
  }

  return {};
});

export const useLoginAction = routeAction$(
  async () => {
    return {};
  },
  zod$({
    username: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const loginAction = useLoginAction();
  return (
    <>
      <Form action={loginAction} class="form-control max-w-lg mx-auto mt-32">
        <label for="username" class="label">
          Username
        </label>
        <input id="username" name="username" class="input" />

        <label for="password" class="label">
          Password
        </label>
        <input type="password" id="password" name="password" class="input" />

        <button type="submit" class="btn btn-primary my-2">
          Login
        </button>

        <p class="py-4">
          Dont have an account?{' '}
          <Link href="/signup" class="link-primary">
            Signup
          </Link>
        </p>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Login Page',
  meta: [
    {
      name: 'description',
      content: 'This is the login page',
    },
  ],
};
