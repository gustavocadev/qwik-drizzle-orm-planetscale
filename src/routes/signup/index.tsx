import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  routeLoader$,
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

export const useSignupUser = routeAction$(
  async (values, event) => {
    const authRequest = auth.handleRequest(event);
    const user = await auth.createUser({
      primaryKey: {
        providerId: 'username',
        providerUserId: values.username,
        password: values.password,
      },
      attributes: {
        username: values.username,
        names: values.names,
        last_names: values.lastNames,
      },
    });
    const session = await auth.createSession(user.userId);
    authRequest.setSession(session);
    throw event.redirect(303, '/');
  },
  zod$({
    username: z.string().min(2),
    password: z.string().min(5),
    names: z.string().min(2),
    lastNames: z.string().min(2),
  })
);

export default component$(() => {
  const signupUserAction = useSignupUser();
  return (
    <>
      <Form
        action={signupUserAction}
        class="form-control max-w-lg mx-auto mt-32"
      >
        <label for="names" class="label">
          Nombres
        </label>
        <input type="text" name="names" class="input bg-base-200" id="names" />

        <label for="lastNames" class="label">
          Apellidos
        </label>
        <input
          type="text"
          name="lastNames"
          class="input bg-base-200"
          id="lastNames"
        />

        <label for="username" class="label">
          Username
        </label>
        <input id="username" name="username" class="input bg-base-200" />

        <label for="password" class="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          class="input bg-base-200"
        />

        <button type="submit" class="btn btn-primary my-2">
          Signup
        </button>

        <p class="py-4">
          Already have an account?{' '}
          <Link href="/login/" class="link-primary">
            Login
          </Link>
        </p>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Signup Page',
  meta: [
    {
      name: 'description',
      content: 'This is the signup page',
    },
  ],
};
