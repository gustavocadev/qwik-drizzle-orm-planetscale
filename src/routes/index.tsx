import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { auth } from '~/lib/lucia';

export const useUserLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw event.redirect(303, '/login');
  }

  console.log('user', user);

  return user;
});

export default component$(() => {
  const userLoader = useUserLoader();
  return (
    <div class="m-8">
      <pre>
        <code>{JSON.stringify(userLoader.value, null, 2)}</code>
      </pre>
      <h1>Protected Page</h1>
      <h1 class="text-3xl">
        if you see this, it means that you have successfully authenticated
      </h1>
    </div>
  );
});
