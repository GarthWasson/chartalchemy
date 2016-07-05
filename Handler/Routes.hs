module Handler.Routes where

import Import
import Data.FileEmbed

getRoutesR :: Handler TypedContent
getRoutesR = return $ TypedContent typePlain
                    $ toContent $(embedFile "config/routes")
