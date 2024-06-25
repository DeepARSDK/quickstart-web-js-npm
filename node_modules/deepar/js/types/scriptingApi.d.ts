/**
 * DeepAR Scripting API interop variable types.
 */
export declare enum VarType {
    Bool = 0,
    Int = 1,
    Double = 2,
    String = 3
}
/**
 * A DeepAR Scripting API interop namespace.
 */
export declare class ScriptingAPI {
    private module;
    /**
     * @internal
     * @param module DeepAR emscripten module.
     */
    constructor(module: any);
    /**
     * Check if variable with the given name is already created.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return boolean True if the variable is already created, false otherwise.
     */
    hasVar(name: string, slot?: string): boolean;
    /**
     * Get the type of the variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return VarType The variable type.
     */
    getVarType(name: string, slot?: string): VarType;
    /**
     * Get boolean variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return boolean Value of the variable with the specified name.
     */
    getBoolVar(name: string, slot?: string): boolean;
    /**
     * Get int variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return int Value of the variable with the specified name.
     */
    getIntVar(name: string, slot?: string): number;
    /**
     * Get the double variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return double Value of the variable with the specified name.
     */
    getDoubleVar(name: string, slot?: string): number;
    /**
     * Get the string variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return string Value of the variable with the specified name.
     */
    getStringVar(name: string, slot?: number): string;
    /**
     * Set the boolean variable with the given name.
     * @param name The variable name.
     * @param value Value to be set.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return True if the variable is created, false if the variable already exists and the new value is set.
     */
    setBoolVar(name: string, value: boolean, slot?: string): boolean;
    /**
     * Set the int variable with the given name.
     * @param name The variable name.
     * @param value Value to be set.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return True if the variable is created, false if the variable already exists and the new value is set.
     */
    setIntVar(name: string, value: number, slot?: string): boolean;
    /**
     * Set the double variable with the given name.
     * @param name The variable name.
     * @param value Value to be set.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return True if the variable is created, false if the variable already exists and the new value is set.
     */
    setDoubleVar(name: string, value: number, slot?: string): boolean;
    /**
     * Set the string variable with the given name.
     * @param name The variable name.
     * @param value Value to be set.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return True if the variable is created, false if the variable already exists and the new value is set.
     */
    setStringVar(name: string, value: string, slot?: string): boolean;
    /**
     * Delete variable with the given name.
     * @param name The variable name.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return boolean True if the variable is deleted, false otherwise.
     */
    deleteVar(name: string, slot?: string): boolean;
    /**
     * Clear all variables or variables from the specified effect.
     * @param slot The slot of the effect in which to search the variable. If it is not given, variable will be searched for in all the effects.
     * @return boolean True if one or more variables are deleted, false otherwise.
     */
    clearVars(slot?: string): boolean;
}
