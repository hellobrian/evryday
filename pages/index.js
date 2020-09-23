import { useAuth } from '@app/utils';
import { Header, FormDebugger, Layout } from '@app/components';

import { useForm } from 'react-hook-form';

function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function Field({
  id,
  register,
  required = false,
  defaultValue = 'test',
  type = 'text',
  errors,
}) {
  return (
    <>
      <label htmlFor={id}>
        <span className="label-text">Example</span>
        <input
          id={id}
          name={id}
          defaultValue={defaultValue}
          type={type}
          /* include validation with required or other standard HTML validation rules */
          ref={register({ required })}
        />
      </label>
      {/* errors will return when field validation fails  */}
      {errors && (
        <span className="error-message">This field is required</span>
      )}
      <style jsx>
        {`
          .label-text {
            margin-right: 8px;
          }
          .error-message {
            color: red;
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
}

export default function Home() {
  const { login, logout, user, loggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log('onSubmit', data);
  };

  const exercises = ['pushUps', 'squats', 'stairs', 'jumpingJacks'];
  return (
    <Layout>
      <Header
        login={login}
        logout={logout}
        user={user}
        loggedIn={loggedIn}
      />
      <div className="root">
        {loggedIn ? (
          <>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <label htmlFor="exercise">
                  <span>Choose an exercise:</span>
                  <select
                    name="exercise"
                    id="exercise"
                    ref={register()}
                  >
                    {exercises.map((ex) => (
                      <option key={ex} value={ex}>
                        {camelCaseToDash(ex)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {getValues(['exercise']) && (
                <label htmlFor="reps">
                  <span>Set a goal for how many reps you do:</span>
                  <input
                    type="number"
                    id="reps"
                    name="reps"
                    defaultValue={10}
                    ref={register()}
                  />
                </label>
              )}
              <FormDebugger
                watch={watch}
                fields={['exercise', 'reps', 'goal']}
              />
            </form>
            <button form="form" type="submit" className="submit">
              Record your workout!
            </button>
          </>
        ) : (
          <div>not logged in</div>
        )}
      </div>
      <style jsx>
        {`
          .root {
            width: 900px;
            margin: 1rem auto;
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            margin-bottom: 1rem;
            width: 50%;
          }

          .error-message {
            color: red;
          }

          .submit {
            background: blue;
            color: white;
          }
        `}
      </style>
    </Layout>
  );
}
