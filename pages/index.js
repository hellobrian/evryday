import { useAuth } from '@app/utils/useAuth';
import { Layout } from '@app/components/layout';
import { Header } from '@app/components/header';

import { useForm } from 'react-hook-form';

export default function Home() {
  const { loggedIn } = useAuth();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => console.log('onSubmit', data);

  return (
    <Layout>
      <Header />
      <div className="root">
        {loggedIn ? (
          <>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* register your input into the hook by invoking the "register" function */}
                <label htmlFor="example">
                  <span className="label-title">Example</span>
                  <input
                    id="example"
                    name="example"
                    defaultValue="test"
                    ref={register}
                  />
                </label>
              </div>

              <div className="row">
                {/* include validation with required or other standard HTML validation rules */}
                <label htmlFor="exampleRequired">
                  <span className="label-title">
                    Example (required)
                  </span>
                  <input
                    id="exampleRequired"
                    name="exampleRequired"
                    ref={register({ required: true })}
                  />
                </label>
              </div>

              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && (
                <span className="error-message">
                  This field is required
                </span>
              )}

              <div>
                <pre>
                  <code>
                    {JSON.stringify(
                      watch(['example', 'exampleRequired']),
                      null,
                      2,
                    )}
                  </code>
                </pre>
              </div>
            </form>
            <button form="form" type="submit" className="submit">
              Submit
            </button>
          </>
        ) : null}
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
             {
              /* justify-content: center; */
            }
            margin-bottom: 1rem;
            width: 50%;
          }

          .label-title {
            margin-right: 8px;
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
