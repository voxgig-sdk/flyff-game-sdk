package core

type FlyffGameError struct {
	IsFlyffGameError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFlyffGameError(code string, msg string, ctx *Context) *FlyffGameError {
	return &FlyffGameError{
		IsFlyffGameError: true,
		Sdk:              "FlyffGame",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FlyffGameError) Error() string {
	return e.Msg
}
