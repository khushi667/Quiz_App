import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data, { answers } from "../database/data";

/** Redux actions */
import * as Action from "../redux/question_reducer";

/** Fetch question hook to fetch API data and set value to store */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();

    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });

    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        /** Async function to fetch backend data */
        (async () => {
            try {
                let question = await data;

                if (Array.isArray(question) && question.length > 0) {
                    setGetData((prev) => ({ ...prev, isLoading: false }));
                    setGetData((prev) => ({ ...prev, apiData: {question, answers} }));

                    /** Dispatch an action */
                    dispatch(Action.startExamAction({question, answers}));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData((prev) => ({
                    ...prev,
                    isLoading: false,
                    serverError: error.message || "Unknown error",
                }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};



/** move action dispatch function */

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}



/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}