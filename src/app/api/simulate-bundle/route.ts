import { NextRequest, NextResponse } from 'next/server';

import { MEV_CLIENT } from '@/lib/constants';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { bundle, blockNumber } = body;

  let result = await MEV_CLIENT.simulateBundle({
    body: bundle,
    inclusion: {
      block: Number(blockNumber) + 1,
      maxBlock: Number(blockNumber) + 24,
    },
  });

  result = JSON.parse(
    JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  );

  return NextResponse.json({ data: result });
};
