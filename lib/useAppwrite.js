import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await fn()

			if(response){
				setData(response)
			}

		} catch (error) {
			Alert.alert("Error", error.message)

		} finally {
			setIsLoading(false)

		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const refetchData = () => fetchData()

	return { data, isLoading, refetchData }
}

export default useAppwrite