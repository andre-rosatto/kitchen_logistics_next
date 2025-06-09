import { useState } from 'react';
import styles from './Login.module.css';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { setLogged } = useAuthContext();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'email' | 'password') => {
		const text = e.currentTarget.value;
		if (text.length > 0) {
			setError('');
		}
		if (field === 'email') {
			setEmail(text);
		} else {
			setPassword(text);
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`/api/login?email=${email}&password=${password}`)
			.then(res => res.json())
			.then(data => {
				if (data.ok) {
					sessionStorage.setItem('logged', 'true');
					setLogged(true);
				} else {
					setError('E-mail ou senha incorreta.');
				}
			});
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<h2 className={styles.title}>Log In</h2>
				<label className={styles.label}>
					E-mail:
					<input
						className={styles.input}
						required
						type='email'
						autoFocus
						value={email}
						onChange={e => handleInputChange(e, 'email')}
					/>
				</label>
				<label className={styles.label}>
					Senha:
					<input
						className={styles.input}
						required
						type='password'
						value={password}
						onChange={e => handleInputChange(e, 'password')}
					/>
				</label>
				<p className={styles.error}>{error}</p>
				<button
					className={styles.button}
					disabled={password.trim().length === 0 || email.trim().length === 0}
				>Entrar</button>
			</form>
		</div>
	);
}
