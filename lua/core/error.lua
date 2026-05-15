-- FlyffGame SDK error

local FlyffGameError = {}
FlyffGameError.__index = FlyffGameError


function FlyffGameError.new(code, msg, ctx)
  local self = setmetatable({}, FlyffGameError)
  self.is_sdk_error = true
  self.sdk = "FlyffGame"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FlyffGameError:error()
  return self.msg
end


function FlyffGameError:__tostring()
  return self.msg
end


return FlyffGameError
