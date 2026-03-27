export default function useAuth() {
    /* TODO: Ajustar a URL aqui para não ser localhost e sim apenas o endereço da api */
    const login = async (email, password) => {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro no login");
        }

        return await response.json();
    }

    return { login }
}