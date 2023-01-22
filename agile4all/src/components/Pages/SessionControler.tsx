import React from "react";
import { useNavigate } from "react-router";
import { UsersApi } from "../../client";
import { NoValidUserSessionError } from "../../client/exceptions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSession } from "../../store/sessionSlice";


interface ISessionController {
    element: React.ReactElement
}


function SessionController(props: ISessionController) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSessionSet = useAppSelector(({ session }) => Boolean(session))

    const checkCurrentSession = React.useCallback(async () => {
        try {
            const userId = UsersApi.getSavedUserId();
            if (isSessionSet === false) {
                const session = await UsersApi.readUserFromSession()
                dispatch(setSession(session))
            }
            navigate(`/app/users/${userId}/tasks`)
        } catch (e) {
            if (e instanceof NoValidUserSessionError) {
                navigate('/login')
            } else throw e
        }
        // there is no need to check session on each route change    
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [dispatch, isSessionSet])

    React.useEffect(() => {
        checkCurrentSession();

        // return () => {
            // dispatch(removeSession())
        // }

    // there is no need to check session on each route change    
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [])

    return props.element
}

export default SessionController;