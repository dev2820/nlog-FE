import { nlogAPI } from "src/utils/nlog-api";

import { NextApiRequest, NextApiResponse } from "next";

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = req.cookies["refresh_token"]; // 쿠키 이름으로 읽기

  /**
   * api에 refresh 요청
   */
  const { data: newTokens } = await nlogAPI.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;
  res.setHeader("Set-Cookie", [
    `refresh_token=${newRefreshToken}; Domain=.new-blog.store; HttpOnly;`,
    "test=abc;Domain=.new-blog.store;HttpOnly;",
  ]);
  res.status(200).json(newAccessToken);
}
