import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { setItem, deleteItem } from '../Helpers/utils'
import { useHistory, Link} from 'react-router-dom'



const SET_LOGIN = gql`
mutation signIn($mail: String!, $password: String! ){
  signIn(mail: $mail, password: $password){
      token
      user {
          role
      }
  }
}`

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [load, setLoading] = useState(false)

    const [mutate] = useMutation(SET_LOGIN)

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            
            const data = await mutate({ variables: { mail: email, password: password } })

            deleteItem('token')
            setItem('token', data.data.signIn.token)

            if (data.data.signIn.user.role === "ADMIN")
                history.push('/admin')
            else
              history.push('/tickets')

        } catch (e) {
            setError(e.message)
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin"
                                onSubmit={handleClick}>
                                <div className="form-label-group">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Email address"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="inputEmail">Mail</label>
                                </div>
                                <div className="form-label-group">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                    />

                                </div>
                                <button
                                    className="btn btn-lg btn-primary btn-block text-uppercase"
                                    type="submit">
                                    Inicia sesión
                              </button>
                                <hr className="my-4" />

                                <Link to="/register"
                                    className="btn btn-lg btn-info btn-block text-uppercase">
                                    Registrarse
                              </Link>
                            </form>
                        </div>
                    </div>
                </div>
                {error ? error : ''}
            </div>
        </div>
    )
}
export default Login;

